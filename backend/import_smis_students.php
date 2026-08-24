<?php
// One-off import: pulls the full student roster from the St. Mark SMIS library API and creates
// matching rows in eSpace's classes + students tables.
//
// Field mapping (per explicit instruction):
//   RegNo  -> students.admission_number, students.username, and the plaintext source for
//             students.password (bcrypt-hashed, same convention Admin\StudentController::create()
//             already uses for every manually-created student).
//   Name   -> "SURNAME given name(s)" (Ugandan surname-first convention, matching how every
//             existing student row in this DB is already split) => first_name = first word,
//             last_name = remaining word(s).
//   Class  -> "S1".."S6" => classes.name "S.1".."S.6" (matches the dotted style already used by
//             the two pre-existing classes), classes.level = "O Level" (S1-S4) / "A Level" (S5-S6).
//   Stream -> classes.stream_name, verbatim.
//
// Classes are created under the current academic year (academic_years.is_current = 1) and
// de-duplicated by (name, stream_name, academic_year_id) - re-running this script is safe, it
// reuses existing classes and skips students whose admission_number already exists.

declare(strict_types=1);

require __DIR__ . '/app/Utils/GenderGuesser.php';

use eSpace\App\Utils\GenderGuesser;

const API_URL = 'https://smisug.com//STMARKLIBRARYAPI/SLISLIBRARYAPI/api/student';

$pdo = new PDO('mysql:host=localhost;dbname=espace;charset=utf8mb4', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

echo "Fetching roster from API...\n";
$json = file_get_contents(API_URL);
if ($json === false) {
    fwrite(STDERR, "Failed to fetch API\n");
    exit(1);
}
$rows = json_decode($json, true);
if (!is_array($rows)) {
    fwrite(STDERR, "Unexpected API response\n");
    exit(1);
}
echo count($rows) . " records fetched.\n";

$yearStmt = $pdo->query("SELECT id FROM academic_years WHERE is_current = 1 LIMIT 1");
$academicYearId = $yearStmt->fetchColumn();
if (!$academicYearId) {
    fwrite(STDERR, "No current academic year found\n");
    exit(1);
}
echo "Using academic_year_id = {$academicYearId}\n";

function mapLevel(string $classCode): array
{
    // "S1".."S6" -> ["S.1".."S.6", "O Level"|"A Level"]
    $num = (int) preg_replace('/\D/', '', $classCode);
    $name = 'S.' . $num;
    $level = $num >= 5 ? 'A Level' : 'O Level';
    return [$name, $level];
}

function splitName(string $fullName): array
{
    $parts = preg_split('/\s+/', trim($fullName));
    $firstName = array_shift($parts);
    $lastName = implode(' ', $parts);
    return [$firstName, $lastName];
}

$classCache = []; // "name|stream" => id
$findOrCreateClass = function (string $name, string $level, string $stream) use ($pdo, $academicYearId, &$classCache) {
    $key = "{$name}|{$stream}";
    if (isset($classCache[$key])) {
        return $classCache[$key];
    }

    $stmt = $pdo->prepare(
        "SELECT id FROM classes WHERE name = :name AND stream_name = :stream AND academic_year_id = :year AND deleted_at IS NULL"
    );
    $stmt->execute(['name' => $name, 'stream' => $stream, 'year' => $academicYearId]);
    $id = $stmt->fetchColumn();

    if (!$id) {
        $insert = $pdo->prepare(
            "INSERT INTO classes (name, level, stream_name, academic_year_id, created_at, updated_at)
             VALUES (:name, :level, :stream, :year, NOW(), NOW())"
        );
        $insert->execute(['name' => $name, 'level' => $level, 'stream' => $stream, 'year' => $academicYearId]);
        $id = (int) $pdo->lastInsertId();
        echo "  Created class {$name} ({$level}) - {$stream} [id={$id}]\n";
    }

    $classCache[$key] = (int) $id;
    return (int) $id;
};

$existingStmt = $pdo->query("SELECT admission_number FROM students WHERE deleted_at IS NULL");
$existingAdmissionNumbers = array_flip($existingStmt->fetchAll(PDO::FETCH_COLUMN));

$insertStudent = $pdo->prepare(
    "INSERT INTO students
        (username, email, password, role, admission_number, first_name, last_name, gender, class_id, is_active, created_at, updated_at)
     VALUES
        (:username, NULL, :password, 'student', :admission_number, :first_name, :last_name, :gender, :class_id, 1, NOW(), NOW())"
);

$created = 0;
$skippedExisting = 0;
$classesTouched = 0;

$pdo->beginTransaction();
try {
    foreach ($rows as $row) {
        $regNo = trim((string) $row['RegNo']);
        $name = trim((string) $row['Name']);
        $classCode = trim((string) $row['Class']);
        $stream = trim((string) $row['Stream']);

        if (isset($existingAdmissionNumbers[$regNo])) {
            $skippedExisting++;
            continue;
        }

        [$className, $level] = mapLevel($classCode);
        $classId = $findOrCreateClass($className, $level, $stream);

        [$firstName, $lastName] = splitName($name);
        // The given/personal name (last token, e.g. "RUTH" in "NAKIVUMBI RUTH") is the
        // gender-indicative part in this surname-first convention, not the first token.
        $genderSource = $lastName !== '' ? $lastName : $firstName;
        $gender = GenderGuesser::guess(explode(' ', $genderSource)[0]);

        $hashedPassword = password_hash($regNo, PASSWORD_BCRYPT);

        $insertStudent->execute([
            'username' => $regNo,
            'password' => $hashedPassword,
            'admission_number' => $regNo,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'gender' => $gender,
            'class_id' => $classId,
        ]);

        $existingAdmissionNumbers[$regNo] = true;
        $created++;

        if ($created % 500 === 0) {
            echo "  ...{$created} students created so far\n";
        }
    }

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    fwrite(STDERR, "Import failed, rolled back: " . $e->getMessage() . "\n");
    exit(1);
}

echo "\nDone.\n";
echo "Students created: {$created}\n";
echo "Students skipped (admission_number already existed): {$skippedExisting}\n";
echo "Classes involved (existing + newly created): " . count($classCache) . "\n";
