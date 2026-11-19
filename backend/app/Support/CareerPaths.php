<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * My path: common Ugandan A Level (UACE) combinations, the O Level subjects each builds on, and
 * the university courses and careers it usually leads to. A guide for learners choosing after
 * S.4 (and for S.5-S.6 learners to see where their combination goes) - universities set and
 * change their own entry rules, which the page tells learners to confirm.
 */
final class CareerPaths
{
    /** Ways a school may name each subject's department (matched ignoring case, dots and spaces) */
    public const SUBJECT_NAMES = [
        'PHY' => ['PHY', 'PHYSICS'],
        'CHEM' => ['CHEM', 'CHEMISTRY'],
        'BIO' => ['BIO', 'BIOLOGY'],
        'MATH' => ['MTC', 'MATH', 'MATHS', 'MATHEMATICS'],
        'GEOG' => ['GEOG', 'GEO', 'GEOGRAPHY'],
        'HIST' => ['HIST', 'HISTORY', 'HISTORYANDPOLITICALEDUCATION'],
        'LIT' => ['LIT', 'LITERATURE', 'LITERATUREINENGLISH'],
        'ENG' => ['ENG', 'ENGLISH', 'ENGLISHLANGUAGE'],
        'ECON' => ['ECON', 'ECONOMICS'],
        'ENT' => ['ENT', 'ENTREPRENEURSHIP'],
        'DIV' => ['CRE', 'IRE', 'DIVINITY', 'RELIGIOUSEDUCATION'],
        'AGRIC' => ['AGRIC', 'AGRICULTURE'],
        'ART' => ['FART', 'ART', 'FINEART', 'ARTANDDESIGN'],
        'ICT' => ['ICT', 'COMPUTER', 'COMPUTERSTUDIES'],
    ];

    /** A Level subject => [label, O Level subjects it builds on, must the learner have taken one of them] */
    public const A_SUBJECTS = [
        'PHY' => ['Physics', ['PHY'], true],
        'CHEM' => ['Chemistry', ['CHEM'], true],
        'BIO' => ['Biology', ['BIO'], true],
        'MATH' => ['Mathematics', ['MATH'], true],
        'GEOG' => ['Geography', ['GEOG'], false],
        'HIST' => ['History', ['HIST'], false],
        'LIT' => ['Literature', ['LIT', 'ENG'], false],
        'ECON' => ['Economics', ['MATH'], false],
        'ENT' => ['Entrepreneurship', ['ENT', 'MATH'], false],
        'DIV' => ['Divinity', ['DIV'], false],
        'AGRIC' => ['Agriculture', ['AGRIC', 'BIO'], false],
        'ART' => ['Fine Art', ['ART'], true],
    ];

    public const INTERESTS = [
        'health' => 'Health and medicine',
        'engineering' => 'Engineering and building',
        'tech' => 'Computers and data',
        'business' => 'Business and money',
        'law' => 'Law and society',
        'land' => 'Land and environment',
        'farming' => 'Farming and animals',
        'media' => 'Arts, media and design',
        'teaching' => 'Teaching',
    ];

    /** code, the three principal subjects, the usual subsidiary, interests, courses, careers */
    public const COMBINATIONS = [
        ['PCM', ['PHY', 'CHEM', 'MATH'], 'Subsidiary ICT', ['engineering', 'tech', 'teaching'],
            ['Civil, Mechanical or Electrical Engineering', 'Architecture', 'Quantity Surveying', 'Land Surveying and Geomatics', 'Computer Science', 'Industrial Chemistry', 'Education (Science)'],
            ['Engineer', 'Architect', 'Quantity surveyor', 'Software developer', 'Pilot', 'Science teacher']],
        ['PCB', ['PHY', 'CHEM', 'BIO'], 'Subsidiary Mathematics', ['health', 'engineering'],
            ['Medicine and Surgery', 'Dental Surgery', 'Pharmacy', 'Radiography', 'Biomedical Engineering', 'Nursing', 'Medical Laboratory Science'],
            ['Doctor', 'Dentist', 'Pharmacist', 'Radiographer', 'Nurse', 'Laboratory scientist']],
        ['BCM', ['BIO', 'CHEM', 'MATH'], 'Subsidiary ICT', ['health', 'tech'],
            ['Medicine and Surgery', 'Pharmacy', 'Biochemistry', 'Biomedical Sciences', 'Food Science and Technology', 'Biostatistics'],
            ['Doctor', 'Pharmacist', 'Biochemist', 'Food scientist', 'Health data analyst']],
        ['BCG', ['BIO', 'CHEM', 'GEOG'], 'Subsidiary Mathematics', ['health', 'land', 'farming'],
            ['Agriculture', 'Environmental Science', 'Forestry', 'Nursing', 'Food Science and Technology', 'Fisheries and Aquaculture'],
            ['Agronomist', 'Environmental officer', 'Forester', 'Nurse', 'Fisheries officer']],
        ['BCA', ['BIO', 'CHEM', 'AGRIC'], 'Subsidiary Mathematics', ['farming', 'health'],
            ['Veterinary Medicine', 'Agriculture', 'Animal Production', 'Agribusiness', 'Food Science and Technology'],
            ['Veterinary doctor', 'Agricultural officer', 'Farm manager', 'Agribusiness owner']],
        ['MPG', ['MATH', 'PHY', 'GEOG'], 'Subsidiary ICT', ['land', 'engineering', 'tech'],
            ['Land Surveying and Geomatics', 'Urban and Regional Planning', 'Meteorology', 'Physics', 'Geographic Information Science'],
            ['Land surveyor', 'Urban planner', 'GIS specialist', 'Meteorologist']],
        ['PEM', ['PHY', 'ECON', 'MATH'], 'Subsidiary ICT', ['tech', 'business'],
            ['Computer Science', 'Information Technology', 'Statistics', 'Actuarial Science', 'Quantitative Economics'],
            ['Software developer', 'Data analyst', 'Actuary', 'Statistician', 'Economist']],
        ['MEG', ['MATH', 'ECON', 'GEOG'], 'Subsidiary ICT', ['business', 'land', 'tech'],
            ['Economics', 'Statistics', 'Urban and Regional Planning', 'Land Economics', 'Business Administration'],
            ['Economist', 'Statistician', 'Planner', 'Property valuer', 'Business manager']],
        ['MEE', ['MATH', 'ECON', 'ENT'], 'Subsidiary ICT', ['business'],
            ['Accounting and Finance', 'Commerce', 'Business Administration', 'Banking', 'Procurement and Supply Chain'],
            ['Accountant', 'Banker', 'Entrepreneur', 'Finance officer', 'Procurement officer']],
        ['HEG', ['HIST', 'ECON', 'GEOG'], 'Subsidiary Mathematics or ICT', ['law', 'business', 'land', 'teaching'],
            ['Law', 'Development Studies', 'Tourism and Hospitality', 'Public Administration', 'Social Sciences', 'Education (Arts)'],
            ['Lawyer', 'Development worker', 'Tourism officer', 'Administrator', 'Teacher']],
        ['HEL', ['HIST', 'ECON', 'LIT'], 'Subsidiary ICT', ['law', 'media', 'teaching'],
            ['Law', 'Journalism and Mass Communication', 'Social Sciences', 'International Relations', 'Education (Arts)'],
            ['Lawyer', 'Journalist', 'Communications officer', 'Diplomat', 'Teacher']],
        ['HED', ['HIST', 'ECON', 'DIV'], 'Subsidiary ICT', ['law', 'teaching'],
            ['Law', 'Social Work and Social Administration', 'Development Studies', 'Theology', 'Education (Arts)'],
            ['Lawyer', 'Social worker', 'Counsellor', 'Religious leader', 'Teacher']],
        ['HLD', ['HIST', 'LIT', 'DIV'], 'Subsidiary ICT', ['law', 'media', 'teaching'],
            ['Law', 'Journalism and Mass Communication', 'Theology', 'Education (Arts)', 'Social Work'],
            ['Lawyer', 'Journalist', 'Religious leader', 'Teacher', 'Social worker']],
        ['HGL', ['HIST', 'GEOG', 'LIT'], 'Subsidiary ICT', ['teaching', 'media', 'land'],
            ['Education (Arts)', 'Tourism and Hospitality', 'Journalism and Mass Communication', 'Social Sciences'],
            ['Teacher', 'Tour guide', 'Journalist', 'Administrator']],
        ['AHL', ['ART', 'HIST', 'LIT'], 'Subsidiary ICT', ['media'],
            ['Industrial and Fine Art', 'Graphic Design', 'Fashion Design', 'Film and Animation'],
            ['Graphic designer', 'Artist', 'Fashion designer', 'Animator']],
    ];

    public static function key(string $s): string
    {
        return preg_replace('/[^A-Z0-9]/', '', strtoupper($s)) ?? '';
    }

    /** a department's name or description => the subject it is, or null */
    public static function subjectOf(string $name, string $description = ''): ?string
    {
        foreach ([self::key($name), self::key($description)] as $k) {
            if ($k === '') continue;
            foreach (self::SUBJECT_NAMES as $code => $names) {
                if (in_array($k, $names, true)) return $code;
            }
        }
        return null;
    }
}
