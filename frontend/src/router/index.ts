import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Layouts
const MainLayout = () => import('../layouts/MainLayout.vue')
const AuthLayout = () => import('../layouts/AuthLayout.vue')

// Pages
const Landing = () => import('../pages/Landing.vue')
const Login = () => import('../pages/auth/Login.vue')
const Register = () => import('../pages/auth/Register.vue')
const ForgotPassword = () => import('../pages/auth/ForgotPassword.vue')
const ResetPassword = () => import('../pages/auth/ResetPassword.vue')

// Student Pages
const StudentDashboard = () => import('../pages/student/Dashboard.vue')
const StudentClasses = () => import('../pages/student/Classes.vue')
const StudentLiveClasses = () => import('../pages/student/LiveClasses.vue')
const StudentAssignments = () => import('../pages/student/Assignments.vue')
const StudentAssignmentAnswer = () => import('../pages/student/AssignmentAnswer.vue')
const StudentAssignmentResult = () => import('../pages/student/AssignmentResult.vue')
const StudentLibrary = () => import('../pages/student/Library.vue')
const StudentVideos = () => import('../pages/student/Videos.vue')
const StudentNotes = () => import('../pages/student/Notes.vue')
const StudentItemBank = () => import('../pages/student/ItemBank.vue')
const StudentChat = () => import('../pages/student/Chat.vue')
const StudentReports = () => import('../pages/student/Reports.vue')
const StudentSettings = () => import('../pages/student/Settings.vue')
const StudentSearch = () => import('../pages/student/Search.vue')
const StudentAchievements = () => import('../pages/student/Achievements.vue')
const StudentAcademicHistory = () => import('../pages/student/AcademicHistory.vue')
const StudentVirtualLab = () => import('../pages/student/VirtualLab.vue')
const StudentVirtualLabExperiment = () => import('../pages/student/VirtualLabExperiment.vue')
const StudentVirtualLabPlayground = () => import('../pages/student/VirtualLabPlayground.vue')

// Teacher Pages
const TeacherDashboard = () => import('../pages/teacher/Dashboard.vue')
const TeacherChangePassword = () => import('../pages/teacher/ChangePassword.vue')
const TeacherClasses = () => import('../pages/teacher/Classes.vue')
const TeacherLiveClasses = () => import('../pages/teacher/LiveClasses.vue')
const TeacherAssignments = () => import('../pages/teacher/Assignments.vue')
const AssignmentBuilder = () => import('../pages/teacher/AssignmentBuilder.vue')
const AssignmentSubmissions = () => import('../pages/teacher/AssignmentSubmissions.vue')
const TeacherLibrary = () => import('../pages/teacher/Library.vue')
const TeacherVideos = () => import('../pages/teacher/Videos.vue')
const TeacherNotes = () => import('../pages/teacher/Notes.vue')
const TeacherItemBank = () => import('../pages/teacher/ItemBank.vue')
const TeacherChat = () => import('../pages/teacher/Chat.vue')
const TeacherSearch = () => import('../pages/teacher/Search.vue')
const TeacherReports = () => import('../pages/teacher/Reports.vue')
const TeacherMarksheet = () => import('../pages/teacher/Marksheet.vue')
const TeacherVirtualLab = () => import('../pages/teacher/VirtualLab.vue')
const TeacherSettings = () => import('../pages/teacher/Settings.vue')
const StudentPreview = () => import('../pages/teacher/StudentPreview.vue')
const ClassmatesPreview = () => import('../pages/teacher/preview/ClassmatesPreview.vue')
const LibraryPreview = () => import('../pages/teacher/preview/LibraryPreview.vue')
const ItemBankPreview = () => import('../pages/teacher/preview/ItemBankPreview.vue')
const LiveClassesPreview = () => import('../pages/teacher/preview/LiveClassesPreview.vue')
const VideosPreview = () => import('../pages/teacher/preview/VideosPreview.vue')
const ENotesPreview = () => import('../pages/teacher/preview/ENotesPreview.vue')
const VirtualLabPreview = () => import('../pages/teacher/preview/VirtualLabPreview.vue')
const ENotes = () => import('../pages/teacher/ENotes.vue')
const ENoteBuilder = () => import('../pages/teacher/ENoteBuilder.vue')
const ENotePreview = () => import('../pages/teacher/ENotePreview.vue')
const StudentENotes = () => import('../pages/student/ENotes.vue')

// HOD Pages
const HODDashboard = () => import('../pages/hod/Dashboard.vue')
const HODAnalytics = () => import('../pages/hod/Analytics.vue')
const HODTeachers = () => import('../pages/hod/Teachers.vue')
const HODStudents = () => import('../pages/hod/Students.vue')
const HODSubjects = () => import('../pages/hod/Subjects.vue')
const HODReports = () => import('../pages/hod/Reports.vue')
const HODMarksheet = () => import('../pages/hod/Marksheet.vue')
const HODApprovals = () => import('../pages/hod/Approvals.vue')
const HODLibrary = () => import('../pages/hod/Library.vue')
const HODENotes = () => import('../pages/hod/ENotes.vue')
const HODVideos = () => import('../pages/hod/Videos.vue')
const HODItemBank = () => import('../pages/hod/ItemBank.vue')
const HODAssessments = () => import('../pages/hod/Assessments.vue')
const HODAssignmentSubmissions = () => import('../pages/hod/AssignmentSubmissions.vue')
const HODCharts = () => import('../pages/hod/Charts.vue')
const HODLiveClasses = () => import('../pages/hod/LiveClasses.vue')
const HODChat = () => import('../pages/hod/Chat.vue')

// Admin Pages
const AdminDashboard = () => import('../pages/admin/Dashboard.vue')
const AdminUsers = () => import('../pages/admin/Admin.vue')
const AdminStudents = () => import('../pages/admin/Students.vue')
const AdminTeachers = () => import('../pages/admin/Teachers.vue')
const AdminHODs = () => import('../pages/admin/HODs.vue')
const AdminDepartments = () => import('../pages/admin/Departments.vue')
const AdminSubjects = () => import('../pages/admin/Subjects.vue')
const AdminClasses = () => import('../pages/admin/Classes.vue')
const AdminAcademicYears = () => import('../pages/admin/AcademicYears.vue')
const AdminTerms = () => import('../pages/admin/Terms.vue')
const AdminENoteCurriculum = () => import('../pages/admin/ENoteCurriculum.vue')
const AdminPromotion = () => import('../pages/admin/Promotion.vue')
const AdminReports = () => import('../pages/admin/Reports.vue')
const AdminMarksheet = () => import('../pages/admin/Marksheet.vue')
const AdminRewards = () => import('../pages/admin/Rewards.vue')
const AdminVirtualLab = () => import('../pages/admin/VirtualLab.vue')
const AdminAuditLogs = () => import('../pages/admin/AuditLogs.vue')
const AdminPermissions = () => import('../pages/admin/Permissions.vue')
const AdminSettings = () => import('../pages/admin/Settings.vue')
const AdminBackup = () => import('../pages/admin/Backup.vue')
const AdminLogs = () => import('../pages/admin/Logs.vue')
const AdminLibrary = () => import('../pages/admin/Library.vue')
const AdminVideos = () => import('../pages/admin/Videos.vue')
const AdminItemBank = () => import('../pages/admin/ItemBank.vue')
const AdminNotes = () => import('../pages/admin/Notes.vue')
const AdminAssessments = () => import('../pages/admin/Assessments.vue')
const AdminCharts = () => import('../pages/admin/Charts.vue')
const AdminLiveClasses = () => import('../pages/admin/LiveClasses.vue')
const AdminChat = () => import('../pages/admin/Chat.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/forgot-password',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: ForgotPassword
      }
    ]
  },
  {
    path: '/reset-password',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'ResetPassword',
        component: ResetPassword
      }
    ]
  },
  {
    path: '/student',
    component: MainLayout,
    meta: { requiresAuth: true, role: 'student' },
    children: [
      { path: '', redirect: '/student/dashboard' },
      { path: 'dashboard', name: 'StudentDashboard', component: StudentDashboard },
      { path: 'classes', name: 'StudentClasses', component: StudentClasses },
      { path: 'live-classes', name: 'StudentLiveClasses', component: StudentLiveClasses },
      { path: 'assignments', name: 'StudentAssignments', component: StudentAssignments },
      { path: 'assignments/:id/answer', name: 'StudentAssignmentAnswer', component: StudentAssignmentAnswer },
      { path: 'assignments/:id/submission/:submissionId', name: 'StudentAssignmentSubmission', component: StudentAssignmentResult, meta: { viewMode: 'submission' } },
      { path: 'assignments/:id/result/:submissionId', name: 'StudentAssignmentResult', component: StudentAssignmentResult, meta: { viewMode: 'result' } },
      { path: 'library', name: 'StudentLibrary', component: StudentLibrary },
      { path: 'videos', name: 'StudentVideos', component: StudentVideos },
      { path: 'notes', name: 'StudentNotes', component: StudentNotes },
      { path: 'enotes', name: 'StudentENotes', component: StudentENotes },
      { path: 'enotes/:id', name: 'StudentENoteTopic', component: ENotePreview, meta: { studentMode: true } },
      { path: 'itembank', name: 'StudentItemBank', component: StudentItemBank },
      { path: 'chat', name: 'StudentChat', component: StudentChat },
      { path: 'reports', name: 'StudentReports', component: StudentReports },
      { path: 'settings', name: 'StudentSettings', component: StudentSettings },
      { path: 'search', name: 'StudentSearch', component: StudentSearch },
      { path: 'achievements', name: 'StudentAchievements', component: StudentAchievements },
      { path: 'academic-history', name: 'StudentAcademicHistory', component: StudentAcademicHistory },
      { path: 'virtual-lab', name: 'StudentVirtualLab', component: StudentVirtualLab },
      { path: 'virtual-lab/playground', name: 'StudentVirtualLabPlayground', component: StudentVirtualLabPlayground },
      { path: 'virtual-lab/:assignmentId', name: 'StudentVirtualLabExperiment', component: StudentVirtualLabExperiment }
    ]
  },
  {
    // Standalone (AuthLayout, not the full MainLayout sidebar) - deliberately outside the
    // /teacher route record below so it's never itself subject to the must-change-password
    // redirect it exists to satisfy. A teacher on a temporary password can only reach this
    // page and logout - see the router guard's mustChangePassword check.
    path: '/teacher/change-password',
    component: AuthLayout,
    meta: { requiresAuth: true, role: 'teacher' },
    children: [
      { path: '', name: 'TeacherChangePassword', component: TeacherChangePassword }
    ]
  },
  {
    path: '/teacher',
    component: MainLayout,
    meta: { requiresAuth: true, role: 'teacher' },
    children: [
      { path: '', redirect: '/teacher/dashboard' },
      { path: 'dashboard', name: 'TeacherDashboard', component: TeacherDashboard },
      { path: 'classes', name: 'TeacherClasses', component: TeacherClasses },
      { path: 'live-classes', name: 'TeacherLiveClasses', component: TeacherLiveClasses },
      { path: 'assignments', name: 'TeacherAssignments', component: TeacherAssignments },
      { path: 'assignments/create', name: 'AssignmentBuilder', component: AssignmentBuilder },
      { path: 'assignments/:id', name: 'AssignmentView', component: AssignmentBuilder },
      { path: 'assignments/:id/edit', name: 'AssignmentEdit', component: AssignmentBuilder },
      { path: 'assignments/:id/submissions', name: 'AssignmentSubmissions', component: AssignmentSubmissions },
      { path: 'assignments/:id/preview', name: 'TeacherAssignmentPreview', component: StudentAssignmentAnswer, meta: { previewRole: 'teacher' } },
      { path: 'preview', name: 'StudentPreview', component: StudentPreview },
      { path: 'preview/classes/:classId', name: 'ClassmatesPreview', component: ClassmatesPreview },
      { path: 'preview/library/:classId', name: 'LibraryPreview', component: LibraryPreview },
      { path: 'preview/itembank/:classId', name: 'ItemBankPreview', component: ItemBankPreview },
      { path: 'preview/live-classes/:classId', name: 'LiveClassesPreview', component: LiveClassesPreview },
      { path: 'preview/videos/:classId', name: 'VideosPreview', component: VideosPreview },
      { path: 'preview/enotes/:classId', name: 'ENotesPreview', component: ENotesPreview },
      { path: 'preview/enotes/:classId/topics/:id', name: 'ENotesTopicPreview', component: ENotePreview, meta: { previewRole: 'teacher' } },
      { path: 'preview/virtual-lab/:classId', name: 'VirtualLabPreview', component: VirtualLabPreview },
      { path: 'library', name: 'TeacherLibrary', component: TeacherLibrary },
      { path: 'videos', name: 'TeacherVideos', component: TeacherVideos },
      { path: 'notes', name: 'TeacherNotes', component: TeacherNotes },
      { path: 'itembank', name: 'TeacherItemBank', component: TeacherItemBank },
      { path: 'chat', name: 'TeacherChat', component: TeacherChat },
      { path: 'reports', name: 'TeacherReports', component: TeacherReports },
      { path: 'settings', name: 'TeacherSettings', component: TeacherSettings },
      { path: 'enotes', name: 'ENotes', component: ENotes },
      { path: 'enotes/builder/:id', name: 'ENoteBuilder', component: ENoteBuilder },
      { path: 'enotes/preview/:id', name: 'ENotePreview', component: ENotePreview },
      { path: 'search', name: 'TeacherSearch', component: TeacherSearch },
      { path: 'marksheet', name: 'TeacherMarksheet', component: TeacherMarksheet },
      { path: 'virtual-lab', name: 'TeacherVirtualLab', component: TeacherVirtualLab }
    ]
  },
  {
    path: '/hod',
    component: MainLayout,
    meta: { requiresAuth: true, role: 'hod' },
    children: [
      { path: '', redirect: '/hod/dashboard' },
      { path: 'dashboard', name: 'HODDashboard', component: HODDashboard },
      { path: 'analytics', name: 'HODAnalytics', component: HODAnalytics },
      { path: 'teachers', name: 'HODTeachers', component: HODTeachers },
      { path: 'students', name: 'HODStudents', component: HODStudents },
      { path: 'subjects', name: 'HODSubjects', component: HODSubjects },
      { path: 'reports', name: 'HODReports', component: HODReports },
      { path: 'approvals', name: 'HODApprovals', component: HODApprovals },
      { path: 'library', name: 'HODLibrary', component: HODLibrary },
      { path: 'enotes', name: 'HODENotes', component: HODENotes },
      { path: 'enotes/:id', name: 'HODENoteTopic', component: ENotePreview, meta: { previewRole: 'hod' } },
      { path: 'videos', name: 'HODVideos', component: HODVideos },
      { path: 'itembank', name: 'HODItemBank', component: HODItemBank },
      { path: 'assessments', name: 'HODAssessments', component: HODAssessments },
      { path: 'assessments/:id/preview', name: 'HODAssignmentPreview', component: StudentAssignmentAnswer, meta: { previewRole: 'hod' } },
      { path: 'assessments/:id/submissions', name: 'HODAssignmentSubmissions', component: HODAssignmentSubmissions },
      { path: 'assessments/:id/submissions/:submissionId', name: 'HODSubmissionDetail', component: StudentAssignmentResult, meta: { previewRole: 'hod' } },
      { path: 'charts', name: 'HODCharts', component: HODCharts },
      { path: 'live-classes', name: 'HODLiveClasses', component: HODLiveClasses },
      { path: 'chat', name: 'HODChat', component: HODChat },
      { path: 'marksheet', name: 'HODMarksheet', component: HODMarksheet }
    ]
  },
  {
    path: '/admin',
    component: MainLayout,
    meta: { requiresAuth: true, role: ['admin', 'super_admin'] },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'users', name: 'AdminUsers', component: AdminUsers },
      { path: 'students', name: 'AdminStudents', component: AdminStudents },
      { path: 'teachers', name: 'AdminTeachers', component: AdminTeachers },
      { path: 'hods', name: 'AdminHODs', component: AdminHODs },
      { path: 'departments', name: 'AdminDepartments', component: AdminDepartments },
      { path: 'subjects', name: 'AdminSubjects', component: AdminSubjects },
      { path: 'classes', name: 'AdminClasses', component: AdminClasses },
      { path: 'academic-years', name: 'AdminAcademicYears', component: AdminAcademicYears },
      { path: 'terms', name: 'AdminTerms', component: AdminTerms },
      { path: 'enotes-curriculum', name: 'AdminENoteCurriculum', component: AdminENoteCurriculum },
      { path: 'promotion', name: 'AdminPromotion', component: AdminPromotion },
      { path: 'reports', name: 'AdminReports', component: AdminReports },
      { path: 'audit-logs', name: 'AdminAuditLogs', component: AdminAuditLogs },
      { path: 'permissions', name: 'AdminPermissions', component: AdminPermissions },
      { path: 'settings', name: 'AdminSettings', component: AdminSettings },
      { path: 'backup', name: 'AdminBackup', component: AdminBackup },
      { path: 'logs', name: 'AdminLogs', component: AdminLogs },
      { path: 'library', name: 'AdminLibrary', component: AdminLibrary },
      { path: 'videos', name: 'AdminVideos', component: AdminVideos },
      { path: 'itembank', name: 'AdminItemBank', component: AdminItemBank },
      { path: 'notes', name: 'AdminNotes', component: AdminNotes },
      { path: 'assessments', name: 'AdminAssessments', component: AdminAssessments },
      { path: 'assessments/:id/preview', name: 'AdminAssignmentPreview', component: StudentAssignmentAnswer, meta: { previewRole: 'admin' } },
      { path: 'charts', name: 'AdminCharts', component: AdminCharts },
      { path: 'live-classes', name: 'AdminLiveClasses', component: AdminLiveClasses },
      { path: 'chat', name: 'AdminChat', component: AdminChat },
      { path: 'marksheet', name: 'AdminMarksheet', component: AdminMarksheet },
      { path: 'rewards', name: 'AdminRewards', component: AdminRewards },
      { path: 'virtual-lab', name: 'AdminVirtualLab', component: AdminVirtualLab }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  // BASE_URL is '/eSpace/' in both dev and the production build (see vite.config.ts's `base`),
  // so this strips that prefix when matching routes and re-adds it when generating links.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // If store is empty but isAuthenticated is true, reset it (inconsistent state after logout)
  if (!authStore.user && authStore.isAuthenticated) {
    authStore.isAuthenticated = false
  }
  
  // If store is empty and not authenticated, try to load from localStorage. Goes through the
  // store's own restoreFromStorage() (not an inline parse) so dual-role state - activeRole/
  // secondaryRole/teacherId, for a HOD assigned from an existing teacher account - is re-derived
  // exactly like login() does, instead of a hard refresh silently dropping the role switcher.
  if (!authStore.user && !authStore.isAuthenticated) {
    authStore.restoreFromStorage()
  }
  
  console.log('Router guard:', {
    to: to.path,
    from: from.path,
    isAuthenticated: authStore.isAuthenticated,
    userRole: authStore.userRole,
    user: authStore.user,
    requiresAuth: to.meta.requiresAuth,
    requiredRole: to.meta.role
  })
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      next('/login')
      return
    }
    
    // Check role requirements
    if (to.meta.role) {
      const requiredRole = to.meta.role
      const hasRequiredRole = Array.isArray(requiredRole) 
        ? authStore.hasAnyRole(requiredRole as string[])
        : authStore.hasRole(requiredRole as string)
      
      console.log('Role check:', {
        required: requiredRole,
        hasRole: hasRequiredRole,
        userRole: authStore.userRole
      })
      
      if (!hasRequiredRole) {
        // Redirect to appropriate dashboard based on user role
        const role = authStore.userRole
        console.log('Role mismatch, redirecting based on role:', role)
        if (role === 'student') next('/student/dashboard')
        else if (role === 'teacher') next('/teacher/dashboard')
        else if (role === 'hod') next('/hod/dashboard')
        else if (role === 'admin' || role === 'super_admin') next('/admin/dashboard')
        else next('/login')
        return
      }
    }
  }
  
  // A teacher still on a temporary/admin-set password can only reach the change-password page
  // (and logout, which just flips isAuthenticated to false and lands on /login, bypassing this
  // check entirely) - see MustChangePasswordMiddleware for the matching backend enforcement.
  // Re-entrant: if the role check above already redirected elsewhere (e.g. away from a /hod
  // route back to /teacher/dashboard), that next() call re-triggers this guard on the new
  // target, so this still catches it.
  if (
    authStore.isAuthenticated &&
    authStore.userRole === 'teacher' &&
    (authStore.user as any)?.must_change_password &&
    to.name !== 'TeacherChangePassword'
  ) {
    next('/teacher/change-password')
    return
  }

  // If authenticated and trying to access the landing/auth pages, redirect to dashboard
  if (authStore.isAuthenticated && (to.path === '/' || to.path === '/login' || to.path === '/register')) {
    const role = authStore.userRole
    console.log('Authenticated user accessing auth page, redirecting to dashboard:', role)
    if (role === 'student') next('/student/dashboard')
    else if (role === 'teacher') next('/teacher/dashboard')
    else if (role === 'hod') next('/hod/dashboard')
    else if (role === 'admin' || role === 'super_admin') next('/admin/dashboard')
    else next('/login')
    return
  }
  
  console.log('Navigation allowed')
  next()
})

export default router
