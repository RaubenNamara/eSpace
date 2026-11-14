/**
 * Tusome's navigation, by role. The sidebar lists the hubs; a hub with more than one page shows
 * those pages as tabs across the top of each of them (MainLayout). Every page keeps its own
 * address - the tabs only link between them - so bookmarks and notification links keep working.
 *
 * To add a page: put it in the hub it belongs to (as a tab), or, if it is reached from inside
 * another page and needs no tab, add its path to that hub's `also` so the hub stays lit on it.
 */

export interface HubTab {
  path: string
  label: string
  icon: string
  /** shown only to some users of the role (see MainLayout's visible()) */
  gate?: 'publications' | 'super_admin' | 'report_cards'
}

export interface Hub {
  key: string
  label: string
  icon: string
  tabs: HubTab[]
  /** more pages that belong to this hub without a tab of their own */
  also?: string[]
  /** a thin line above this hub in the sidebar */
  divider?: boolean
}

const labs = (r: string): Hub => ({
  key: 'labs',
  label: 'Labs',
  icon: 'FlaskIcon',
  tabs: [
    { path: `/${r}/virtual-lab`, label: 'Science Lab', icon: 'FlaskIcon' },
    { path: `/${r}/ict-lab`, label: 'ICT Lab', icon: 'ComputerIcon' },
    { path: `/${r}/anatomy`, label: 'Anatomy', icon: 'FlaskIcon' }
  ]
})

export const HUBS: Record<string, Hub[]> = {
  student: [
    { key: 'home', label: 'eClass', icon: 'DashboardIcon', tabs: [{ path: '/student/dashboard', label: 'eClass', icon: 'DashboardIcon' }], also: ['/student/notices', '/student/search', '/student/settings'] },
    {
      key: 'learn', label: 'Learn', icon: 'NoteIcon', divider: true,
      tabs: [
        { path: '/student/enotes', label: 'eNotes', icon: 'NoteIcon' },
        { path: '/student/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
      ],
      also: ['/student/notes', '/student/my-notes', '/student/downloads', '/student/classes']
    },
    { key: 'assessments', label: 'Assessments', icon: 'DocumentTextIcon', tabs: [{ path: '/student/assignments', label: 'Assessments', icon: 'DocumentTextIcon' }] },
    {
      key: 'library', label: 'Library', icon: 'LibraryIcon',
      tabs: [
        { path: '/student/library', label: 'eLibrary', icon: 'LibraryIcon' },
        { path: '/student/videos', label: 'Videos', icon: 'VideoCameraIcon' },
        { path: '/student/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
        { path: '/student/publications', label: 'Publications', icon: 'NewspaperIcon', gate: 'publications' }
      ]
    },
    labs('student'),
    {
      key: 'progress', label: 'My Progress', icon: 'MapIcon',
      tabs: [
        { path: '/student/learning-map', label: 'Learning Map', icon: 'MapIcon' },
        { path: '/student/academic-history', label: 'Academic History', icon: 'AcademicCapIcon' },
        { path: '/student/achievements', label: 'Achievements', icon: 'TrophyIcon' },
        { path: '/student/report-card', label: 'Report card', icon: 'ClipboardListIcon', gate: 'report_cards' }
      ],
      also: ['/student/reports', '/student/constructs']
    },
    { key: 'chats', label: 'Chats', icon: 'ChatIcon', divider: true, tabs: [{ path: '/student/chat', label: 'Chats', icon: 'ChatIcon' }], also: ['/student/study-groups'] }
  ],

  teacher: [
    { key: 'home', label: 'Dashboard', icon: 'DashboardIcon', tabs: [{ path: '/teacher/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }], also: ['/teacher/notices', '/teacher/planner', '/teacher/search', '/teacher/settings'] },
    { key: 'classes', label: 'My Classes', icon: 'BookOpenIcon', divider: true, tabs: [{ path: '/teacher/classes', label: 'My Classes', icon: 'BookOpenIcon' }] },
    {
      key: 'teaching', label: 'Teaching', icon: 'NoteIcon',
      tabs: [
        { path: '/teacher/enotes', label: 'eNotes', icon: 'NoteIcon' },
        { path: '/teacher/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
        { path: '/teacher/library', label: 'eLibrary', icon: 'LibraryIcon' },
        { path: '/teacher/videos', label: 'Videos', icon: 'VideoCameraIcon' },
        { path: '/teacher/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
        { path: '/teacher/publications', label: 'Publications', icon: 'NewspaperIcon', gate: 'publications' }
      ],
      also: ['/teacher/notes', '/teacher/enote-questions']
    },
    labs('teacher'),
    {
      key: 'assessments', label: 'Assessments', icon: 'DocumentTextIcon',
      tabs: [
        { path: '/teacher/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
        { path: '/teacher/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
        { path: '/teacher/physical-exams', label: 'Physical Exams', icon: 'ClipboardListIcon' }
      ],
      also: ['/teacher/live-quiz', '/teacher/term-copy', '/teacher/constructs']
    },
    {
      key: 'insights', label: 'Insights', icon: 'ChartIcon',
      tabs: [
        { path: '/teacher/class-map', label: 'Class Learning Map', icon: 'MapIcon' },
        { path: '/teacher/engagement', label: 'Engagement', icon: 'ChartIcon' },
        { path: '/teacher/coverage', label: 'Coverage', icon: 'ChartBarIcon' },
        { path: '/teacher/scheme', label: 'Scheme of work', icon: 'ClipboardListIcon' },
        { path: '/teacher/early-warning', label: 'Early warning', icon: 'BellAlertIcon' },
        { path: '/teacher/report-cards', label: 'Report cards', icon: 'ClipboardListIcon', gate: 'report_cards' }
      ],
      also: ['/teacher/reports']
    },
    { key: 'cases', label: 'Cases', icon: 'ShieldIcon', tabs: [{ path: '/teacher/cases', label: 'Cases', icon: 'ShieldIcon' }] },
    { key: 'chats', label: 'Chats', icon: 'ChatIcon', divider: true, tabs: [{ path: '/teacher/chat', label: 'Chats', icon: 'ChatIcon' }] }
  ],

  hod: [
    { key: 'home', label: 'Dashboard', icon: 'DashboardIcon', tabs: [{ path: '/hod/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }], also: ['/hod/search'] },
    {
      key: 'department', label: 'Department', icon: 'UsersIcon', divider: true,
      tabs: [
        { path: '/hod/teachers', label: 'Teachers', icon: 'UsersIcon' },
        { path: '/hod/students', label: 'Students', icon: 'AcademicCapIcon' }
      ],
      also: ['/hod/subjects']
    },
    {
      key: 'teaching', label: 'Teaching', icon: 'NoteIcon',
      tabs: [
        { path: '/hod/enotes', label: 'eNotes', icon: 'NoteIcon' },
        { path: '/hod/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
        { path: '/hod/library', label: 'eLibrary', icon: 'LibraryIcon' },
        { path: '/hod/videos', label: 'Videos', icon: 'VideoCameraIcon' },
        { path: '/hod/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
      ],
      also: ['/hod/approvals']
    },
    labs('hod'),
    {
      key: 'assessments', label: 'Assessments', icon: 'DocumentTextIcon',
      tabs: [
        { path: '/hod/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
        { path: '/hod/marking', label: 'Marking', icon: 'TargetIcon' },
        { path: '/hod/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
        { path: '/hod/physical-exams', label: 'Physical Exams', icon: 'ClipboardListIcon' }
      ]
    },
    {
      key: 'insights', label: 'Insights', icon: 'ChartIcon',
      tabs: [
        { path: '/hod/term-report', label: 'Term report', icon: 'ClipboardListIcon' },
        { path: '/hod/analytics', label: 'Analytics', icon: 'ChartIcon' },
        { path: '/hod/early-warning', label: 'Early warning', icon: 'BellAlertIcon' },
        { path: '/hod/charts', label: 'Engagement', icon: 'ChartBarIcon' }
      ],
      also: ['/hod/reports']
    },
    {
      key: 'cases', label: 'Cases', icon: 'ShieldIcon',
      tabs: [
        { path: '/hod/case-records', label: 'All cases', icon: 'ShieldIcon' },
        { path: '/hod/cases', label: 'Record a case', icon: 'ClipboardListIcon' }
      ]
    },
    {
      key: 'community', label: 'Chats & notices', icon: 'ChatIcon', divider: true,
      tabs: [
        { path: '/hod/chat', label: 'Chats', icon: 'ChatIcon' },
        { path: '/hod/notices', label: 'Noticeboard', icon: 'MegaphoneIcon' }
      ]
    }
  ],

  admin: [
    { key: 'home', label: 'Dashboard', icon: 'DashboardIcon', tabs: [{ path: '/admin/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }], also: ['/admin/search'] },
    {
      key: 'people', label: 'People', icon: 'UsersIcon', divider: true,
      tabs: [
        { path: '/admin/students', label: 'Students', icon: 'AcademicCapIcon' },
        { path: '/admin/teachers', label: 'Teachers', icon: 'BriefcaseIcon' },
        { path: '/admin/hods', label: 'HODs', icon: 'UserGroupIcon' },
        { path: '/admin/assign-teachers', label: 'Assign Teachers', icon: 'CheckCircleIcon' },
        { path: '/admin/bulk-enrol', label: 'Bulk enrolment', icon: 'TableCellsIcon' },
        { path: '/admin/promotion', label: 'Promotion', icon: 'AcademicCapIcon' },
        { path: '/admin/parent-links', label: 'Parents', icon: 'UserGroupIcon' },
        { path: '/admin/cases', label: 'Cases', icon: 'ShieldIcon' },
        { path: '/admin/cases/new', label: 'Record a case', icon: 'ClipboardListIcon', gate: 'super_admin' }
      ],
      also: ['/admin/student-sign-ins']
    },
    {
      key: 'setup', label: 'School setup', icon: 'BuildingOfficeIcon',
      tabs: [
        { path: '/admin/classes', label: 'Classes', icon: 'BuildingLibraryIcon' },
        { path: '/admin/subjects', label: 'Subjects', icon: 'BookIcon' },
        { path: '/admin/departments', label: 'Departments', icon: 'BuildingOfficeIcon' },
        { path: '/admin/terms', label: 'Terms', icon: 'CalendarDaysIcon' },
        { path: '/admin/academic-years', label: 'Academic Years', icon: 'CalendarIcon' },
        { path: '/admin/exam-dates', label: 'Exam dates', icon: 'TargetIcon' },
        { path: '/admin/enotes-curriculum', label: 'Curriculum', icon: 'NoteIcon' }
      ],
      also: ['/admin/constructs']
    },
    {
      key: 'content', label: 'Content', icon: 'NoteIcon',
      tabs: [
        { path: '/admin/notes', label: 'eNotes', icon: 'NoteIcon' },
        { path: '/admin/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
        { path: '/admin/library', label: 'eLibrary', icon: 'LibraryIcon' },
        { path: '/admin/videos', label: 'Videos', icon: 'VideoCameraIcon' },
        { path: '/admin/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
      ]
    },
    labs('admin'),
    {
      key: 'assessment', label: 'Assessment', icon: 'DocumentTextIcon',
      tabs: [
        { path: '/admin/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
        { path: '/admin/supervision', label: 'Supervision', icon: 'TargetIcon' },
        { path: '/admin/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
        { path: '/admin/physical-exams', label: 'Physical Exams', icon: 'ClipboardListIcon' }
      ]
    },
    {
      key: 'reports', label: 'Reports', icon: 'ChartBarIcon',
      tabs: [
        { path: '/admin/reports', label: 'Reports', icon: 'ChartBarIcon' },
        { path: '/admin/impact', label: 'School impact', icon: 'ChartIcon' },
        { path: '/admin/end-of-term', label: 'End of term', icon: 'CheckCircleIcon' },
        { path: '/admin/charts', label: 'Engagement', icon: 'ChartIcon' },
        { path: '/admin/rewards', label: 'Rewards & Badges', icon: 'TrophyIcon' }
      ]
    },
    {
      key: 'community', label: 'Chats & notices', icon: 'ChatIcon', divider: true,
      tabs: [
        { path: '/admin/chat', label: 'Chats', icon: 'ChatIcon' },
        { path: '/admin/notices', label: 'Noticeboard', icon: 'MegaphoneIcon' }
      ]
    },
    {
      key: 'system', label: 'System', icon: 'CogIcon',
      tabs: [
        { path: '/admin/settings', label: 'Settings', icon: 'CogIcon' },
        { path: '/admin/users', label: 'Admins', icon: 'UsersIcon' },
        { path: '/admin/logs', label: 'System logs', icon: 'DocumentIcon' },
        { path: '/admin/demo-requests', label: 'Demo requests', icon: 'BriefcaseIcon' },
        { path: '/admin/privacy-reports', label: 'Privacy reports', icon: 'KeyIcon', gate: 'super_admin' },
        { path: '/admin/feedback', label: 'Feedback', icon: 'ChatQuestionIcon', gate: 'super_admin' }
      ],
      also: ['/admin/audit-logs', '/admin/backup', '/admin/permissions']
    }
  ]
}
