<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Guesses 'male' or 'female' from a first name when an admin doesn't pick
 * a gender explicitly. Dictionary lookup first (covers common Western,
 * African/Swahili, Arabic, and Indian first names), then a suffix heuristic
 * for anything not listed. Always returns male or female, never 'other',
 * since there's no reliable way to infer that from a name alone.
 */
class GenderGuesser
{
    private const FEMALE_NAMES = [
        'mary', 'jane', 'grace', 'faith', 'joy', 'hope', 'mercy', 'joyce', 'ann', 'anne',
        'anna', 'agnes', 'alice', 'esther', 'ruth', 'sarah', 'sara', 'rebecca', 'rachel',
        'elizabeth', 'lucy', 'lydia', 'catherine', 'caroline', 'carol', 'christine', 'diana',
        'dorothy', 'dorcas', 'edith', 'eunice', 'evelyn', 'irene', 'jacinta', 'jennifer',
        'jessica', 'josephine', 'judith', 'julia', 'juliet', 'linet', 'lilian', 'lillian',
        'margaret', 'martha', 'mercy', 'monica', 'nancy', 'naomi', 'nasra', 'patricia',
        'pauline', 'peris', 'philomena', 'priscilla', 'purity', 'rael', 'rehema', 'rhoda',
        'risper', 'rose', 'salome', 'sharon', 'stella', 'susan', 'teresa', 'theresa',
        'valerie', 'vera', 'veronica', 'vivian', 'winnie', 'winifred', 'zainab', 'zipporah',
        'amina', 'aisha', 'asha', 'fatuma', 'fatima', 'halima', 'hawa', 'khadija', 'mariam',
        'maryam', 'nadia', 'najma', 'rukia', 'safia', 'sofia', 'sophia', 'zahra', 'zara',
        'amanda', 'amber', 'amy', 'angela', 'ashley', 'barbara', 'brenda', 'brittany',
        'chloe', 'claire', 'clara', 'crystal', 'cynthia', 'daisy', 'deborah', 'denise',
        'donna', 'emily', 'emma', 'erica', 'gloria', 'hannah', 'heather', 'helen', 'ivy',
        'jasmine', 'jean', 'jenny', 'karen', 'katherine', 'kate', 'kathleen', 'kelly',
        'kimberly', 'laura', 'lauren', 'leah', 'linda', 'lisa', 'lois', 'lorraine', 'louise',
        'maria', 'marie', 'megan', 'melissa', 'michelle', 'miriam', 'natalie', 'nicole',
        'olivia', 'pamela', 'paula', 'rachael', 'rebekah', 'regina', 'renee', 'sally',
        'samantha', 'sandra', 'shirley', 'sonia', 'stacy', 'stephanie', 'sylvia', 'tabitha',
        'tracy', 'valentine', 'vanessa', 'victoria', 'wanjiru', 'wangari', 'wanjiku',
        'akinyi', 'atieno', 'awuor', 'adhiambo', 'achieng', 'nyambura', 'njeri', 'muthoni',
        'wairimu', 'waithera', 'chebet', 'chepkoech', 'jepkosgei', 'jerop', 'kemunto',
        'kerubo', 'moraa', 'nyaboke', 'nyokabi', 'wamboi', 'wangui', 'priya', 'anjali',
        'divya', 'kavya', 'neha', 'pooja', 'riya', 'shreya', 'sneha', 'meera', 'radhika',
        'kansiime', 'katusiime', 'babrah', 'arakit', 'annah', 'kemigisha', 'kobusingye',
        'nabirye', 'nakato', 'nansubuga', 'namara', 'atuhaire', 'ainembabazi',
    ];

    private const MALE_NAMES = [
        'john', 'james', 'joseph', 'peter', 'paul', 'daniel', 'david', 'michael', 'samuel',
        'stephen', 'steven', 'thomas', 'timothy', 'andrew', 'anthony', 'benjamin', 'brian',
        'charles', 'christopher', 'dennis', 'edward', 'eric', 'francis', 'frank', 'george',
        'gerald', 'gilbert', 'gordon', 'harrison', 'henry', 'isaac', 'jacob', 'jared',
        'jason', 'jeffrey', 'jeremiah', 'jerome', 'jonathan', 'joshua', 'julius', 'justin',
        'kelvin', 'kennedy', 'kenneth', 'kevin', 'lawrence', 'leonard', 'martin', 'mathew',
        'matthew', 'maurice', 'moses', 'nathan', 'nelson', 'nicholas', 'noah', 'oliver',
        'oscar', 'patrick', 'philip', 'phillip', 'raphael', 'raymond', 'richard', 'robert',
        'roland', 'ronald', 'ronny', 'shadrack', 'simon', 'solomon', 'stanley', 'victor',
        'vincent', 'walter', 'wilfred', 'william', 'zachary', 'abdi', 'abdul', 'abdullah',
        'ahmed', 'ali', 'hassan', 'hussein', 'ibrahim', 'idris', 'ismail', 'khalid', 'omar',
        'rashid', 'said', 'salim', 'yusuf', 'kamau', 'kariuki', 'kimani', 'kipchoge',
        'kiprop', 'kiptoo', 'kiplagat', 'maina', 'mwangi', 'mutua', 'ndungu', 'njoroge',
        'njuguna', 'ochieng', 'odhiambo', 'ogolla', 'okoth', 'omondi', 'onyango', 'otieno',
        'wafula', 'wekesa', 'gitau', 'muriuki', 'karanja', 'wachira', 'ngugi', 'amit',
        'ankit', 'arjun', 'arun', 'deepak', 'karan', 'manoj', 'rahul', 'raj', 'rajesh',
        'ravi', 'rohit', 'sanjay', 'vikram', 'vishal', 'aaron', 'adam', 'adrian', 'alan',
        'albert', 'alex', 'alexander', 'alfred', 'allan', 'alvin', 'antony', 'arnold',
        'austin', 'barry', 'bernard', 'bradley', 'brandon', 'bruce', 'bryan', 'calvin',
        'carl', 'clifford', 'clinton', 'colin', 'craig', 'curtis', 'cyrus', 'darren',
        'dennis', 'derek', 'dominic', 'douglas', 'duncan', 'dustin', 'earl', 'elijah',
        'elvis', 'emmanuel', 'eugene', 'evans', 'felix', 'fred', 'frederick', 'gabriel',
        'geoffrey', 'glenn', 'gregory', 'harold', 'harry', 'hillary', 'howard', 'hudson',
        'hugh', 'ian', 'jack', 'jeff', 'jerry', 'jesse', 'jim', 'jimmy', 'joel', 'jonah',
        'jordan', 'jose', 'juma', 'keith', 'kyle', 'lambert', 'lance', 'larry', 'lee',
        'leo', 'leon', 'lewis', 'lloyd', 'louis', 'luke', 'malcolm', 'marcus', 'mark',
        'marvin', 'max', 'melvin', 'meshack', 'mike', 'mitchell', 'morgan', 'murphy',
        'musa', 'mutuma', 'nahashon', 'neil', 'norman', 'obadiah', 'okello', 'orlando',
        'osman', 'owen', 'perez', 'perry', 'peterson', 'phillimon', 'quentin', 'rafael',
        'ralph', 'randall', 'randy', 'reagan', 'reuben', 'rex', 'rick', 'roger', 'roy',
        'russell', 'ryan', 'scott', 'sean', 'sebastian', 'seth', 'shane', 'shawn',
        'sheldon', 'sidney', 'silas', 'stewart', 'terrence', 'terry', 'titus', 'tobias',
        'todd', 'tony', 'travis', 'trevor', 'tyler', 'tyrone', 'vernon', 'vitalis',
        'wallace', 'warren', 'wesley', 'wilson', 'wycliffe', 'xavier', 'zablon',
        'aruhe', 'abigaba', 'ayesiga', 'tumusiime', 'byaruhanga', 'tugume', 'muhwezi',
        'ndyanabo', 'ahimbisibwe', 'twinomujuni', 'mugisha', 'turyahabwe',
    ];

    private const FEMALE_SUFFIXES = [
        'a', 'ah', 'ia', 'na', 'ine', 'elle', 'ette', 'issa', 'yah', 'unah', 'ika', 'ita',
    ];

    private const MALE_SUFFIXES = [
        'o', 'us', 'os', 'im', 'iel', 'on', 'in', 'an', 'ck', 'rd', 'ld', 'nd', 'ph',
    ];

    /**
     * @return 'male'|'female'
     */
    public static function guess(string $firstName): string
    {
        $name = strtolower(trim($firstName));
        $name = preg_replace('/[^a-z]/', '', explode(' ', $name)[0] ?? '') ?? '';

        if ($name === '') {
            return 'male';
        }

        if (in_array($name, self::FEMALE_NAMES, true)) {
            return 'female';
        }

        if (in_array($name, self::MALE_NAMES, true)) {
            return 'male';
        }

        foreach (self::FEMALE_SUFFIXES as $suffix) {
            if (str_ends_with($name, $suffix)) {
                return 'female';
            }
        }

        foreach (self::MALE_SUFFIXES as $suffix) {
            if (str_ends_with($name, $suffix)) {
                return 'male';
            }
        }

        return 'male';
    }
}
