<?php

declare(strict_types=1);

namespace eSpace\Routes;

use eSpace\Routes\Router;

/**
 * API Routes
 * 
 * Defines all API endpoints for the eSpace application.
 * Routes are organized by module and include middleware for authentication and authorization.
 */

// Load routes
require_once __DIR__ . '/Router.php';

// Public routes (no authentication required)
Router::post('/api/auth/login', 'eSpace\App\Controllers\AuthController@login');
Router::post('/api/auth/register', 'eSpace\App\Controllers\AuthController@register');
Router::post('/api/auth/forgot-password', 'eSpace\App\Controllers\AuthController@forgotPassword');
Router::post('/api/auth/reset-password', 'eSpace\App\Controllers\AuthController@resetPassword');

// BBB logoutURL target - a real browser navigation (BBB redirects the top-level window here), not
// a JSON API call, so it's outside the /api + auth-middleware group: it checks the session itself
// and always responds with an HTTP redirect, authenticated or not. See LiveClassReturnController.
Router::get('/live-class/return', 'eSpace\App\Controllers\LiveClassReturnController@handle');

// Protected routes (authentication required)
Router::group(['prefix' => '/api', 'middleware' => ['auth']], function () {
    
    // Auth routes
    Router::post('/auth/logout', 'eSpace\App\Controllers\AuthController@logout');
    Router::post('/auth/refresh', 'eSpace\App\Controllers\AuthController@refresh');
    Router::get('/auth/me', 'eSpace\App\Controllers\AuthController@me');
    Router::put('/auth/profile', 'eSpace\App\Controllers\AuthController@updateProfile');
    Router::put('/auth/password', 'eSpace\App\Controllers\AuthController@changePassword');
    Router::post('/auth/profile-photo', 'eSpace\App\Controllers\AuthController@uploadProfilePhoto');

    // Notifications (shared across every role - each request is scoped to the signed-in user's
    // own id+role from the session, same pattern as the /auth/* routes above)
    Router::get('/notifications', 'eSpace\App\Controllers\NotificationController@index');
    Router::get('/notifications/unread-count', 'eSpace\App\Controllers\NotificationController@unreadCount');
    Router::put('/notifications/{id}/read', 'eSpace\App\Controllers\NotificationController@markAsRead');
    Router::put('/notifications/read-all', 'eSpace\App\Controllers\NotificationController@markAllAsRead');

    // Student routes
    Router::group(['prefix' => '/student', 'middleware' => ['role:student']], function () {
        // Dashboard
        Router::get('/dashboard', 'eSpace\App\Controllers\Student\DashboardController@index');

        // Academic History
        Router::get('/academic-history', 'eSpace\App\Controllers\Student\AcademicHistoryController@index');

        // Classes
        Router::get('/classes', 'eSpace\App\Controllers\Student\ClassController@index');
        Router::get('/classes/{id}', 'eSpace\App\Controllers\Student\ClassController@show');
        Router::get('/classes/{id}/students', 'eSpace\App\Controllers\Student\ClassController@students');
        Router::get('/classes/{id}/topics', 'eSpace\App\Controllers\Student\ClassController@topics');
        Router::get('/classes/{id}/resources', 'eSpace\App\Controllers\Student\ClassController@resources');

        // Live Classes (BigBlueButton)
        Router::get('/live-classes', 'eSpace\App\Controllers\Student\LiveClassController@index');
        Router::post('/live-classes/{id}/join', 'eSpace\App\Controllers\Student\LiveClassController@join');
        Router::post('/live-classes/{id}/leave', 'eSpace\App\Controllers\Student\LiveClassController@leave');
        Router::get('/live-classes/{id}/recordings', 'eSpace\App\Controllers\Student\LiveClassController@recordings');

        // Assignments
        Router::get('/assignments', 'eSpace\App\Controllers\Student\AssignmentController@index');
        Router::get('/assignments/{id}', 'eSpace\App\Controllers\Student\AssignmentController@show');
        Router::post('/assignments/{id}/submit', 'eSpace\App\Controllers\Student\AssignmentController@submit');
        Router::get('/assignments/{id}/feedback', 'eSpace\App\Controllers\Student\AssignmentController@feedback');
        
        // eLibrary
        Router::get('/library', 'eSpace\App\Controllers\Student\LibraryController@index');
        Router::get('/library/{id}', 'eSpace\App\Controllers\Student\LibraryController@show');
        Router::post('/library/{id}/progress', 'eSpace\App\Controllers\Student\LibraryController@updateProgress');
        Router::post('/library/{id}/bookmark', 'eSpace\App\Controllers\Student\LibraryController@toggleBookmark');

        // Videos
        Router::get('/videos', 'eSpace\App\Controllers\Student\VideoController@index');
        Router::get('/videos/{id}', 'eSpace\App\Controllers\Student\VideoController@show');

        // eNotes
        Router::get('/notes', 'eSpace\App\Controllers\Student\NoteController@index');
        Router::get('/notes/{id}', 'eSpace\App\Controllers\Student\NoteController@show');
        Router::post('/notes/{id}/progress', 'eSpace\App\Controllers\Student\NoteController@updateProgress');
        Router::post('/notes/{id}/bookmark', 'eSpace\App\Controllers\Student\NoteController@toggleBookmark');

        // eNotes Module (Professional - topics and pages)
        Router::get('/enotes/topics', 'eSpace\App\Controllers\Student\ENoteController@index');
        Router::get('/enotes/topics/{id}', 'eSpace\App\Controllers\Student\ENoteController@show');
        Router::post('/enotes/pages/{pageId}/tutor-explain', 'eSpace\App\Controllers\Student\ENoteController@tutorExplain');

        // Item Bank
        Router::get('/itembank', 'eSpace\App\Controllers\Student\ItemBankController@index');
        Router::get('/itembank/{id}', 'eSpace\App\Controllers\Student\ItemBankController@show');
        
        // Chat
        Router::get('/chat/contacts', 'eSpace\App\Controllers\Student\ChatController@contacts');
        Router::get('/chat/classes', 'eSpace\App\Controllers\Student\ChatController@classes');
        Router::get('/chat/conversations', 'eSpace\App\Controllers\Student\ChatController@conversations');
        Router::get('/chat/unread-count', 'eSpace\App\Controllers\Student\ChatController@unreadCount');
        Router::get('/chat/conversations/{id}', 'eSpace\App\Controllers\Student\ChatController@messages');
        Router::post('/chat/conversations/{id}/send', 'eSpace\App\Controllers\Student\ChatController@sendMessage');
        Router::post('/chat/conversations/{id}/clear', 'eSpace\App\Controllers\Student\ChatController@clearChat');
        Router::post('/chat/conversations', 'eSpace\App\Controllers\Student\ChatController@createConversation');

        // Global search (shared eSpace\App\Controllers\SearchController - see notes there)
        Router::get('/search', 'eSpace\App\Controllers\SearchController@index');
        Router::get('/search/suggestions', 'eSpace\App\Controllers\SearchController@suggestions');

        // Reports
        Router::get('/reports/performance', 'eSpace\App\Controllers\Student\ReportController@performance');
        Router::get('/reports/assignments', 'eSpace\App\Controllers\Student\ReportController@assignments');
        Router::get('/reports/reading', 'eSpace\App\Controllers\Student\ReportController@reading');

        // Report Cards (CBC assessment report - own reports only, read-only)
        Router::get('/report-cards/terms', 'eSpace\App\Controllers\Student\ReportCardController@listTerms');
        Router::get('/report-cards', 'eSpace\App\Controllers\Student\ReportCardController@index');
        Router::get('/report-cards/{termId}', 'eSpace\App\Controllers\Student\ReportCardController@show');

        // Rewards & Badges (own awards only, read-only - the automatic engine decides these)
        Router::get('/awards/summary', 'eSpace\App\Controllers\Student\AwardController@summary');
        Router::get('/awards', 'eSpace\App\Controllers\Student\AwardController@index');

        // Virtual Lab (own attempts only - experiments published to the student's own class)
        Router::get('/virtual-lab/objects', 'eSpace\App\Controllers\Student\VirtualLabController@objects');
        Router::get('/virtual-lab/assignments', 'eSpace\App\Controllers\Student\VirtualLabController@assignments');
        Router::post('/virtual-lab/assignments/{assignmentId}/start', 'eSpace\App\Controllers\Student\VirtualLabController@start');
        Router::get('/virtual-lab/attempts/{attemptId}', 'eSpace\App\Controllers\Student\VirtualLabController@show');
        Router::post('/virtual-lab/attempts/{attemptId}/action', 'eSpace\App\Controllers\Student\VirtualLabController@logAction');
        Router::post('/virtual-lab/attempts/{attemptId}/observation', 'eSpace\App\Controllers\Student\VirtualLabController@saveObservation');
        Router::post('/virtual-lab/attempts/{attemptId}/answer', 'eSpace\App\Controllers\Student\VirtualLabController@saveAnswer');
        Router::post('/virtual-lab/attempts/{attemptId}/notebook', 'eSpace\App\Controllers\Student\VirtualLabController@addNotebookEntry');
        Router::delete('/virtual-lab/attempts/{attemptId}/notebook/{entryId}', 'eSpace\App\Controllers\Student\VirtualLabController@removeNotebookEntry');
        Router::post('/virtual-lab/attempts/{attemptId}/hint', 'eSpace\App\Controllers\Student\VirtualLabController@recordHint');
        Router::post('/virtual-lab/attempts/{attemptId}/safety-mistake', 'eSpace\App\Controllers\Student\VirtualLabController@recordSafetyMistake');
        Router::post('/virtual-lab/attempts/{attemptId}/submit', 'eSpace\App\Controllers\Student\VirtualLabController@submit');
        Router::get('/virtual-lab/results', 'eSpace\App\Controllers\Student\VirtualLabController@results');
        Router::get('/virtual-lab/assignments/{assignmentId}/preview', 'eSpace\App\Controllers\Student\VirtualLabController@previewAssignment');
        Router::get('/virtual-lab/skills', 'eSpace\App\Controllers\Student\VirtualLabController@skills');
        Router::get('/virtual-lab/skills/overview', 'eSpace\App\Controllers\Student\VirtualLabController@skillsOverview');
        Router::get('/virtual-lab/skills/{skillKey}/evidence', 'eSpace\App\Controllers\Student\VirtualLabController@skillEvidence');
        Router::get('/virtual-lab/skills/{skillKey}/recommendations', 'eSpace\App\Controllers\Student\VirtualLabController@skillRecommendations');

        // Assignments
        Router::get('/assignments', 'eSpace\App\Controllers\Student\AssignmentController@index');
        Router::get('/assignments/{id}', 'eSpace\App\Controllers\Student\AssignmentController@show');
        Router::post('/assignments/{id}/submit', 'eSpace\App\Controllers\Student\AssignmentController@submit');
        Router::get('/assignments/{assignment_id}/submission/{submission_id}', 'eSpace\App\Controllers\Student\AssignmentController@getSubmission');
        Router::get('/assignments/{assignment_id}/result/{submission_id}', 'eSpace\App\Controllers\Student\AssignmentController@getResult');
        Router::put('/assignments/submissions/{submission_id}', 'eSpace\App\Controllers\Student\AssignmentController@submit');

        // Canvas/PDF answer annotations (student's own answer layer)
        Router::post('/assignments/questions/{questionId}/answer-annotations', 'eSpace\App\Controllers\Student\AssignmentController@saveAnswerAnnotations');
        Router::get('/assignments/questions/{questionId}/answer-annotations/{submissionId}', 'eSpace\App\Controllers\Student\AssignmentController@getAnswerAnnotations');
        Router::post('/assignments/questions/{questionId}/upload-answer-pdf', 'eSpace\App\Controllers\Student\AssignmentController@uploadAnswerAttachment');

        // Settings
        Router::get('/settings', 'eSpace\App\Controllers\Student\SettingsController@index');
        Router::put('/settings/profile', 'eSpace\App\Controllers\Student\SettingsController@updateProfile');
        Router::put('/settings/notifications', 'eSpace\App\Controllers\Student\SettingsController@updateNotificationPreferences');
    });

    // Teacher routes
    Router::group(['prefix' => '/teacher', 'middleware' => ['role:teacher', 'must_change_password']], function () {
        // Dashboard
        Router::get('/dashboard', 'eSpace\App\Controllers\Teacher\DashboardController@index');

        // Departments (a teacher in more than one department can switch their active one)
        Router::get('/departments', 'eSpace\App\Controllers\Teacher\DepartmentController@index');
        Router::put('/departments/active', 'eSpace\App\Controllers\Teacher\DepartmentController@setActive');

        // Classes
        Router::get('/classes', 'eSpace\App\Controllers\Teacher\ClassController@index');
        Router::get('/classes/academic-years', 'eSpace\App\Controllers\Teacher\ClassController@academicYears');
        Router::get('/classes/{id}', 'eSpace\App\Controllers\Teacher\ClassController@show');
        Router::get('/classes/{id}/students', 'eSpace\App\Controllers\Teacher\ClassController@students');
        
        // Students
        Router::get('/students/enrolled', 'eSpace\App\Controllers\Teacher\StudentController@enrolled');
        Router::delete('/students/{id}', 'eSpace\App\Controllers\Teacher\StudentController@delete');
        Router::put('/students/{id}/re-enroll', 'eSpace\App\Controllers\Teacher\StudentController@reEnroll');
        
        // Live Classes (BigBlueButton)
        Router::get('/live-classes', 'eSpace\App\Controllers\Teacher\LiveClassController@index');
        Router::post('/live-classes', 'eSpace\App\Controllers\Teacher\LiveClassController@create');
        Router::get('/live-classes/preview', 'eSpace\App\Controllers\Teacher\LiveClassController@previewIndex');
        Router::get('/live-classes/{id}', 'eSpace\App\Controllers\Teacher\LiveClassController@show');
        Router::put('/live-classes/{id}', 'eSpace\App\Controllers\Teacher\LiveClassController@update');
        Router::delete('/live-classes/{id}', 'eSpace\App\Controllers\Teacher\LiveClassController@delete');
        Router::post('/live-classes/{id}/start', 'eSpace\App\Controllers\Teacher\LiveClassController@start');
        Router::post('/live-classes/{id}/end', 'eSpace\App\Controllers\Teacher\LiveClassController@end');
        Router::post('/live-classes/{id}/join', 'eSpace\App\Controllers\Teacher\LiveClassController@join');
        Router::get('/live-classes/{id}/recordings', 'eSpace\App\Controllers\Teacher\LiveClassController@recordings');
        Router::get('/live-classes/{id}/attendance', 'eSpace\App\Controllers\Teacher\LiveClassController@attendance');
        
        // Assignments
        Router::get('/assignments', 'eSpace\App\Controllers\Teacher\AssignmentController@index');
        Router::post('/assignments', 'eSpace\App\Controllers\Teacher\AssignmentController@create');
        Router::get('/assignments/{id}', 'eSpace\App\Controllers\Teacher\AssignmentController@show');
        Router::get('/assignments/{id}/preview', 'eSpace\App\Controllers\Teacher\AssignmentController@preview');
        Router::put('/assignments/{id}', 'eSpace\App\Controllers\Teacher\AssignmentController@update');
        Router::delete('/assignments/{id}', 'eSpace\App\Controllers\Teacher\AssignmentController@delete');
        Router::post('/assignments/{id}/publish', 'eSpace\App\Controllers\Teacher\AssignmentController@publish');
        Router::post('/assignments/{id}/duplicate', 'eSpace\App\Controllers\Teacher\AssignmentController@duplicate');
        Router::get('/assignments/{id}/curriculum', 'eSpace\App\Controllers\Teacher\AssignmentController@getCurriculum');
        Router::put('/assignments/{id}/curriculum', 'eSpace\App\Controllers\Teacher\AssignmentController@updateCurriculum');
        Router::get('/assignments/{id}/classes', 'eSpace\App\Controllers\Teacher\AssignmentController@getClasses');
        Router::put('/assignments/{id}/classes', 'eSpace\App\Controllers\Teacher\AssignmentController@updateClasses');
        
        // Assignment Questions
        Router::post('/assignments/{id}/questions', 'eSpace\App\Controllers\Teacher\AssignmentController@addQuestion');
        Router::put('/assignments/{id}/questions/{questionId}', 'eSpace\App\Controllers\Teacher\AssignmentController@updateQuestion');
        Router::delete('/assignments/{id}/questions/{questionId}', 'eSpace\App\Controllers\Teacher\AssignmentController@deleteQuestion');
        
        // Assignment Submissions
        Router::get('/assignments/{id}/submissions', 'eSpace\App\Controllers\Teacher\AssignmentController@submissions');
        Router::get('/assignments/{id}/submissions/{submissionId}', 'eSpace\App\Controllers\Teacher\AssignmentController@submission');
        Router::post('/assignments/{id}/submissions/{submissionId}/grade', 'eSpace\App\Controllers\Teacher\AssignmentController@grade');
        Router::post('/assignments/{id}/submissions/{submissionId}/feedback', 'eSpace\App\Controllers\Teacher\AssignmentController@feedback');

        // Marking workspace (canvas/PDF marking layer, per-question marks, status workflow)
        Router::get('/assignments/{id}/submissions/{submissionId}/marking', 'eSpace\App\Controllers\Teacher\MarkingController@getSubmissionForMarking');
        Router::put('/assignments/{id}/submissions/{submissionId}/marking-annotations', 'eSpace\App\Controllers\Teacher\MarkingController@saveMarkingAnnotations');
        Router::put('/assignments/{id}/submissions/{submissionId}/marks', 'eSpace\App\Controllers\Teacher\MarkingController@saveQuestionMarks');
        Router::put('/assignments/{id}/submissions/{submissionId}/general-feedback', 'eSpace\App\Controllers\Teacher\MarkingController@saveGeneralFeedback');
        Router::post('/assignments/{id}/submissions/{submissionId}/complete-marking', 'eSpace\App\Controllers\Teacher\MarkingController@completeMarking');
        Router::post('/assignments/{id}/submissions/{submissionId}/return', 'eSpace\App\Controllers\Teacher\MarkingController@returnToStudent');
        Router::post('/assignments/{id}/submissions/{submissionId}/reopen', 'eSpace\App\Controllers\Teacher\MarkingController@reopenSubmission');

        // Dropdown Data for Assignment Builder
        Router::get('/subjects', 'eSpace\App\Controllers\Teacher\AssignmentController@subjects');
        Router::get('/streams/{classId}', 'eSpace\App\Controllers\Teacher\AssignmentController@streams');

        // Question attachments (canvas/pdf_annotation questions) and teacher authoring annotations
        Router::post('/assignments/questions/{questionId}/attachment', 'eSpace\App\Controllers\Teacher\AssignmentController@uploadQuestionAttachment');
        Router::get('/assignments/questions/{questionId}/annotations', 'eSpace\App\Controllers\Teacher\AssignmentController@getQuestionAnnotations');
        Router::put('/assignments/questions/{questionId}/annotations', 'eSpace\App\Controllers\Teacher\AssignmentController@saveQuestionAnnotations');

        // eLibrary
        Router::get('/library', 'eSpace\App\Controllers\Teacher\LibraryController@index');
        Router::post('/library', 'eSpace\App\Controllers\Teacher\LibraryController@create');
        Router::get('/library/preview', 'eSpace\App\Controllers\Teacher\LibraryController@previewIndex');
        Router::get('/library/{id}', 'eSpace\App\Controllers\Teacher\LibraryController@show');
        Router::put('/library/{id}', 'eSpace\App\Controllers\Teacher\LibraryController@update');
        Router::post('/library/{id}/replace-file', 'eSpace\App\Controllers\Teacher\LibraryController@replaceFile');
        Router::delete('/library/{id}', 'eSpace\App\Controllers\Teacher\LibraryController@delete');

        // Videos
        Router::get('/videos', 'eSpace\App\Controllers\Teacher\VideoController@index');
        Router::post('/videos', 'eSpace\App\Controllers\Teacher\VideoController@create');
        Router::get('/videos/preview', 'eSpace\App\Controllers\Teacher\VideoController@previewIndex');
        Router::get('/videos/{id}', 'eSpace\App\Controllers\Teacher\VideoController@show');
        Router::put('/videos/{id}', 'eSpace\App\Controllers\Teacher\VideoController@update');
        Router::delete('/videos/{id}', 'eSpace\App\Controllers\Teacher\VideoController@delete');

        // eNotes (Legacy - simple notes)
        Router::get('/notes', 'eSpace\App\Controllers\Teacher\NoteController@index');
        Router::post('/notes', 'eSpace\App\Controllers\Teacher\NoteController@create');
        Router::get('/notes/{id}', 'eSpace\App\Controllers\Teacher\NoteController@show');
        Router::put('/notes/{id}', 'eSpace\App\Controllers\Teacher\NoteController@update');
        Router::delete('/notes/{id}', 'eSpace\App\Controllers\Teacher\NoteController@delete');
        Router::post('/notes/upload', 'eSpace\App\Controllers\Teacher\NoteController@upload');
        Router::get('/notes/subjects', 'eSpace\App\Controllers\Teacher\NoteController@subjects');
        Router::get('/notes/topics/{subject_id}', 'eSpace\App\Controllers\Teacher\NoteController@topics');
        Router::get('/notes/subtopics/{topic_id}', 'eSpace\App\Controllers\Teacher\NoteController@subtopics');

        // eNotes Module (Professional - topics and pages)
        Router::get('/enotes/dashboard', 'eSpace\App\Controllers\Teacher\ENoteController@dashboard');
        Router::get('/enotes/assignments', 'eSpace\App\Controllers\Teacher\ENoteController@assignments');
        Router::get('/enotes/topics', 'eSpace\App\Controllers\Teacher\ENoteController@index');
        Router::post('/enotes/topics', 'eSpace\App\Controllers\Teacher\ENoteController@create');
        Router::get('/enotes/preview', 'eSpace\App\Controllers\Teacher\ENoteController@previewIndex');
        Router::get('/enotes/preview/topics/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@previewShow');
        Router::get('/enotes/topics/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@show');
        Router::put('/enotes/topics/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@update');
        Router::delete('/enotes/topics/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@delete');
        Router::post('/enotes/topics/{id}/publish', 'eSpace\App\Controllers\Teacher\ENoteController@publish');
        Router::post('/enotes/topics/{id}/unpublish', 'eSpace\App\Controllers\Teacher\ENoteController@unpublish');
        Router::post('/enotes/topics/{id}/archive', 'eSpace\App\Controllers\Teacher\ENoteController@archive');
        Router::post('/enotes/topics/{id}/duplicate', 'eSpace\App\Controllers\Teacher\ENoteController@duplicateTopic');
        Router::put('/enotes/topics/{id}/narration-voice', 'eSpace\App\Controllers\Teacher\ENoteController@updateNarrationVoice');
        Router::post('/enotes/pages/{pageId}/narration', 'eSpace\App\Controllers\Teacher\ENoteController@generatePageNarration');
        Router::post('/enotes/topics/{topic_id}/pages', 'eSpace\App\Controllers\Teacher\ENoteController@createPage');
        Router::put('/enotes/pages/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@updatePage');
        Router::delete('/enotes/pages/{id}', 'eSpace\App\Controllers\Teacher\ENoteController@deletePage');
        Router::post('/enotes/pages/{id}/duplicate', 'eSpace\App\Controllers\Teacher\ENoteController@duplicatePage');
        Router::post('/enotes/topics/{topic_id}/reorder', 'eSpace\App\Controllers\Teacher\ENoteController@reorderPages');

        // eNotes Curriculum browsing (admin-authored, read-only here)
        Router::get('/enotes/curriculum/meta', 'eSpace\App\Controllers\Teacher\ENoteCurriculumController@meta');
        Router::get('/enotes/curriculum/topics/{id}', 'eSpace\App\Controllers\Teacher\ENoteCurriculumController@showTopic');

        // eNotes Image Upload
        Router::post('/enotes/upload-image', 'eSpace\App\Controllers\Teacher\ENoteImageController@upload');
        // Item Bank
        Router::get('/itembank', 'eSpace\App\Controllers\Teacher\ItemBankController@index');
        Router::post('/itembank', 'eSpace\App\Controllers\Teacher\ItemBankController@create');
        Router::get('/itembank/preview', 'eSpace\App\Controllers\Teacher\ItemBankController@previewIndex');
        Router::get('/itembank/{id}', 'eSpace\App\Controllers\Teacher\ItemBankController@show');
        Router::put('/itembank/{id}', 'eSpace\App\Controllers\Teacher\ItemBankController@update');
        Router::delete('/itembank/{id}', 'eSpace\App\Controllers\Teacher\ItemBankController@delete');
        
        // Chat
        Router::get('/chat/contacts', 'eSpace\App\Controllers\Teacher\ChatController@contacts');
        Router::get('/chat/conversations', 'eSpace\App\Controllers\Teacher\ChatController@conversations');
        Router::get('/chat/unread-count', 'eSpace\App\Controllers\Teacher\ChatController@unreadCount');
        Router::get('/chat/conversations/{id}', 'eSpace\App\Controllers\Teacher\ChatController@messages');
        Router::post('/chat/conversations/{id}/send', 'eSpace\App\Controllers\Teacher\ChatController@sendMessage');
        Router::post('/chat/conversations/{id}/clear', 'eSpace\App\Controllers\Teacher\ChatController@clearChat');
        Router::post('/chat/conversations', 'eSpace\App\Controllers\Teacher\ChatController@createConversation');

        // Global search (shared eSpace\App\Controllers\SearchController - see notes there)
        Router::get('/search', 'eSpace\App\Controllers\SearchController@index');
        Router::get('/search/suggestions', 'eSpace\App\Controllers\SearchController@suggestions');

        // Reports
        Router::get('/reports/class-performance', 'eSpace\App\Controllers\Teacher\ReportController@classPerformance');
        Router::get('/reports/assignment-performance', 'eSpace\App\Controllers\Teacher\ReportController@assignmentPerformance');
        Router::get('/reports/student-performance', 'eSpace\App\Controllers\Teacher\ReportController@studentPerformance');

        // Report Cards (CBC assessment report)
        Router::get('/report-cards/terms', 'eSpace\App\Controllers\Teacher\ReportCardController@listTerms');
        Router::get('/report-cards/students', 'eSpace\App\Controllers\Teacher\ReportCardController@listStudents');
        Router::get('/report-cards/my-subjects', 'eSpace\App\Controllers\Teacher\ReportCardController@listMySubjects');
        Router::post('/report-cards/{studentId}/{termId}/subjects/{subjectId}/generate', 'eSpace\App\Controllers\Teacher\ReportCardController@generateSubject');
        Router::post('/report-cards/{studentId}/{termId}/generate', 'eSpace\App\Controllers\Teacher\ReportCardController@generateFull');
        Router::put('/report-cards/{studentId}/{termId}/class-teacher-comment', 'eSpace\App\Controllers\Teacher\ReportCardController@updateClassTeacherComment');
        Router::get('/report-cards/{studentId}/{termId}', 'eSpace\App\Controllers\Teacher\ReportCardController@show');

        // Performance reports & marksheets
        Router::get('/performance/subjects', 'eSpace\App\Controllers\Teacher\PerformanceController@listSubjects');
        Router::get('/performance/marksheet/download', 'eSpace\App\Controllers\Teacher\PerformanceController@downloadMarksheet');
        Router::get('/performance/marksheet', 'eSpace\App\Controllers\Teacher\PerformanceController@marksheet');
        Router::get('/performance/students/{studentId}/subjects/{subjectId}', 'eSpace\App\Controllers\Teacher\PerformanceController@studentSubject');
        Router::get('/performance/students/{studentId}', 'eSpace\App\Controllers\Teacher\PerformanceController@studentGeneral');

        // Virtual Lab (create/edit own experiments, copy templates, publish, grade attempts)
        Router::get('/virtual-lab/objects', 'eSpace\App\Controllers\Teacher\VirtualLabController@objects');
        Router::get('/virtual-lab/experiments', 'eSpace\App\Controllers\Teacher\VirtualLabController@index');
        Router::post('/virtual-lab/experiments', 'eSpace\App\Controllers\Teacher\VirtualLabController@store');
        Router::post('/virtual-lab/experiments/{id}/copy-template', 'eSpace\App\Controllers\Teacher\VirtualLabController@copyTemplate');
        Router::post('/virtual-lab/experiments/{id}/publish', 'eSpace\App\Controllers\Teacher\VirtualLabController@publish');
        Router::put('/virtual-lab/experiments/{id}', 'eSpace\App\Controllers\Teacher\VirtualLabController@update');
        Router::delete('/virtual-lab/experiments/{id}', 'eSpace\App\Controllers\Teacher\VirtualLabController@destroy');
        Router::get('/virtual-lab/experiments/{id}', 'eSpace\App\Controllers\Teacher\VirtualLabController@show');
        Router::get('/virtual-lab/assignments/{id}/attempts', 'eSpace\App\Controllers\Teacher\VirtualLabController@attempts');
        Router::get('/virtual-lab/assignments/{id}/preview', 'eSpace\App\Controllers\Teacher\VirtualLabController@previewAssignment');
        Router::get('/virtual-lab/assignments', 'eSpace\App\Controllers\Teacher\VirtualLabController@assignments');
        Router::put('/virtual-lab/attempts/{id}/grade', 'eSpace\App\Controllers\Teacher\VirtualLabController@grade');
        Router::put('/virtual-lab/attempts/{id}/answers/{questionId}/grade', 'eSpace\App\Controllers\Teacher\VirtualLabController@gradeAnswer');
        Router::get('/virtual-lab/attempts/{id}', 'eSpace\App\Controllers\Teacher\VirtualLabController@attemptDetail');
        Router::get('/virtual-lab/students/{studentId}/skills/{skillKey}/evidence', 'eSpace\App\Controllers\Teacher\VirtualLabController@studentSkillEvidence');
        Router::get('/virtual-lab/students/{studentId}/skills', 'eSpace\App\Controllers\Teacher\VirtualLabController@studentSkills');

        // Student View (preview)
        Router::get('/student-view', 'eSpace\App\Controllers\Teacher\StudentViewController@index');
        Router::get('/student-view/{path}', 'eSpace\App\Controllers\Teacher\StudentViewController@proxy');
        
        // Settings
        Router::get('/settings', 'eSpace\App\Controllers\Teacher\SettingsController@index');
        Router::put('/settings/profile', 'eSpace\App\Controllers\Teacher\SettingsController@updateProfile');
    });

    // HOD routes
    Router::group(['prefix' => '/hod', 'middleware' => ['role:hod']], function () {
        // Dashboard
        Router::get('/dashboard', 'eSpace\App\Controllers\HOD\DashboardController@index');
        
        // Department Management
        Router::get('/department/info', 'eSpace\App\Controllers\HOD\DepartmentController@getDepartmentInfo');
        Router::get('/department/stats', 'eSpace\App\Controllers\HOD\DepartmentController@getStats');
        Router::get('/department/teachers', 'eSpace\App\Controllers\HOD\DepartmentController@getTeachers');
        Router::get('/department/subjects', 'eSpace\App\Controllers\HOD\DepartmentController@getSubjects');
        Router::get('/department/approvals', 'eSpace\App\Controllers\HOD\DepartmentController@getApprovals');
        Router::post('/department/approve', 'eSpace\App\Controllers\HOD\DepartmentController@approveContent');
        Router::post('/department/reject', 'eSpace\App\Controllers\HOD\DepartmentController@rejectContent');
        
        // Department Analytics
        Router::get('/analytics', 'eSpace\App\Controllers\HOD\AnalyticsController@index');
        Router::get('/analytics/teachers', 'eSpace\App\Controllers\HOD\AnalyticsController@teachers');
        Router::get('/analytics/assignments', 'eSpace\App\Controllers\HOD\AnalyticsController@assignments');
        Router::get('/analytics/reading', 'eSpace\App\Controllers\HOD\AnalyticsController@reading');
        Router::get('/analytics/performance', 'eSpace\App\Controllers\HOD\AnalyticsController@performance');
        
        // Teachers
        Router::get('/teachers', 'eSpace\App\Controllers\HOD\TeacherController@index');
        Router::post('/teachers', 'eSpace\App\Controllers\HOD\TeacherController@create');
        Router::get('/teachers/{id}', 'eSpace\App\Controllers\HOD\TeacherController@show');
        Router::put('/teachers/{id}', 'eSpace\App\Controllers\HOD\TeacherController@update');
        Router::delete('/teachers/{id}', 'eSpace\App\Controllers\HOD\TeacherController@delete');
        
        // Students
        Router::get('/students', 'eSpace\App\Controllers\HOD\StudentController@index');
        Router::post('/students', 'eSpace\App\Controllers\HOD\StudentController@create');
        Router::post('/students/deenroll', 'eSpace\App\Controllers\HOD\StudentController@deenroll');
        Router::get('/students/{id}', 'eSpace\App\Controllers\HOD\StudentController@show');
        Router::put('/students/{id}', 'eSpace\App\Controllers\HOD\StudentController@update');

        // Subjects
        Router::get('/subjects', 'eSpace\App\Controllers\HOD\SubjectController@index');
        Router::get('/subjects/{id}', 'eSpace\App\Controllers\HOD\SubjectController@show');

        // eLibrary - department-scoped moderation
        Router::get('/library', 'eSpace\App\Controllers\HOD\LibraryController@index');
        Router::put('/library/{id}', 'eSpace\App\Controllers\HOD\LibraryController@update');
        Router::delete('/library/{id}', 'eSpace\App\Controllers\HOD\LibraryController@delete');

        // Videos - department-scoped moderation
        Router::get('/videos', 'eSpace\App\Controllers\HOD\VideoController@index');
        Router::put('/videos/{id}', 'eSpace\App\Controllers\HOD\VideoController@update');
        Router::delete('/videos/{id}', 'eSpace\App\Controllers\HOD\VideoController@delete');

        // Item Bank - department-scoped moderation
        Router::get('/itembank', 'eSpace\App\Controllers\HOD\ItemBankController@index');
        Router::put('/itembank/{id}', 'eSpace\App\Controllers\HOD\ItemBankController@update');
        Router::delete('/itembank/{id}', 'eSpace\App\Controllers\HOD\ItemBankController@delete');

        // Live Classes (BigBlueButton) - read-only oversight
        Router::get('/live-classes', 'eSpace\App\Controllers\HOD\LiveClassController@index');
        Router::post('/live-classes/{id}/join', 'eSpace\App\Controllers\HOD\LiveClassController@join');
        Router::get('/live-classes/{id}/attendance', 'eSpace\App\Controllers\HOD\LiveClassController@attendance');
        Router::get('/live-classes/{id}/recordings', 'eSpace\App\Controllers\HOD\LiveClassController@recordings');

        // Chat - read-only monitoring of the department
        Router::get('/chat/conversations', 'eSpace\App\Controllers\HOD\ChatController@conversations');
        Router::get('/chat/conversations/{id}', 'eSpace\App\Controllers\HOD\ChatController@messages');

        // Assignments - read-only oversight + "Preview as Student"
        Router::get('/assignments', 'eSpace\App\Controllers\HOD\AssignmentController@index');
        Router::get('/assignments/{id}/preview', 'eSpace\App\Controllers\HOD\AssignmentController@preview');
        Router::get('/assignments/{id}/submissions', 'eSpace\App\Controllers\HOD\AssignmentController@submissions');
        Router::get('/assignments/{id}/submissions/{submissionId}', 'eSpace\App\Controllers\HOD\AssignmentController@submissionDetail');

        // eNotes - read-only oversight, browsable by teacher
        Router::get('/enotes', 'eSpace\App\Controllers\HOD\ENoteController@index');
        Router::get('/enotes/{id}', 'eSpace\App\Controllers\HOD\ENoteController@show');

        // Reports
        Router::get('/reports/department', 'eSpace\App\Controllers\HOD\ReportController@department');
        Router::get('/reports/teacher-monitoring', 'eSpace\App\Controllers\HOD\ReportController@teacherMonitoring');
        Router::get('/reports/assignment-monitoring', 'eSpace\App\Controllers\HOD\ReportController@assignmentMonitoring');

        // Report Cards (CBC assessment report - read-only, department-scoped)
        Router::get('/report-cards/terms', 'eSpace\App\Controllers\HOD\ReportCardController@listTerms');
        Router::get('/report-cards/students', 'eSpace\App\Controllers\HOD\ReportCardController@listStudents');
        Router::get('/report-cards/{studentId}/{termId}', 'eSpace\App\Controllers\HOD\ReportCardController@show');

        // Performance reports & marksheets (department-scoped)
        Router::get('/performance/classes', 'eSpace\App\Controllers\HOD\PerformanceController@listClasses');
        Router::get('/performance/subjects', 'eSpace\App\Controllers\HOD\PerformanceController@listSubjects');
        Router::get('/performance/marksheet/download', 'eSpace\App\Controllers\HOD\PerformanceController@downloadMarksheet');
        Router::get('/performance/marksheet', 'eSpace\App\Controllers\HOD\PerformanceController@marksheet');
        Router::get('/performance/students/{studentId}/subjects/{subjectId}', 'eSpace\App\Controllers\HOD\PerformanceController@studentSubject');
        Router::get('/performance/students/{studentId}', 'eSpace\App\Controllers\HOD\PerformanceController@studentGeneral');


        // Resource Approval
        Router::get('/approvals/library', 'eSpace\App\Controllers\HOD\ApprovalController@library');
        Router::put('/approvals/library/{id}', 'eSpace\App\Controllers\HOD\ApprovalController@approveLibrary');
        Router::get('/approvals/notes', 'eSpace\App\Controllers\HOD\ApprovalController@notes');
        Router::put('/approvals/notes/{id}', 'eSpace\App\Controllers\HOD\ApprovalController@approveNotes');
        Router::get('/approvals/itembank', 'eSpace\App\Controllers\HOD\ApprovalController@itemBank');
        Router::put('/approvals/itembank/{id}', 'eSpace\App\Controllers\HOD\ApprovalController@approveItemBank');
    });

    // A HOD assigned from an existing teacher account ("Assign Teacher as HOD") reaches the real
    // /teacher/* routes below directly with their linked teacher_id - see
    // Controller::hasRole()/AuthService::createSession for the dual-role bridge. No separate
    // /hod/teacher/* route group is needed.

    // Admin routes
    Router::group(['prefix' => '/admin', 'middleware' => ['role:admin,super_admin']], function () {
        // Dashboard
        Router::get('/dashboard', 'eSpace\App\Controllers\Admin\DashboardController@index');

        // Live Classes (BigBlueButton) - school-wide oversight + moderation
        Router::get('/live-classes', 'eSpace\App\Controllers\Admin\LiveClassController@index');
        Router::get('/live-classes/server-status', 'eSpace\App\Controllers\Admin\LiveClassController@serverStatus');
        Router::post('/live-classes/{id}/join', 'eSpace\App\Controllers\Admin\LiveClassController@join');
        Router::post('/live-classes/{id}/end', 'eSpace\App\Controllers\Admin\LiveClassController@end');
        Router::post('/live-classes/{id}/cancel', 'eSpace\App\Controllers\Admin\LiveClassController@cancel');
        Router::get('/live-classes/{id}/attendance', 'eSpace\App\Controllers\Admin\LiveClassController@attendance');
        Router::get('/live-classes/{id}/recordings', 'eSpace\App\Controllers\Admin\LiveClassController@recordings');
        Router::put('/live-classes/recordings/{recordingId}/publish', 'eSpace\App\Controllers\Admin\LiveClassController@publishRecording');
        Router::delete('/live-classes/recordings/{recordingId}', 'eSpace\App\Controllers\Admin\LiveClassController@deleteRecording');

        // Chat - read-only, school-wide monitoring
        Router::get('/chat/conversations', 'eSpace\App\Controllers\Admin\ChatController@conversations');
        Router::get('/chat/conversations/{id}', 'eSpace\App\Controllers\Admin\ChatController@messages');

        // Assignments - read-only, school-wide oversight + "Preview as Student"
        Router::get('/assignments', 'eSpace\App\Controllers\Admin\AssignmentController@index');
        Router::get('/assignments/{id}/preview', 'eSpace\App\Controllers\Admin\AssignmentController@preview');

        // Users
        Router::get('/users', 'eSpace\App\Controllers\Admin\UserController@index');
        Router::post('/users', 'eSpace\App\Controllers\Admin\UserController@create');
        Router::get('/users/{id}', 'eSpace\App\Controllers\Admin\UserController@show');
        Router::put('/users/{id}', 'eSpace\App\Controllers\Admin\UserController@update');
        Router::delete('/users/{id}', 'eSpace\App\Controllers\Admin\UserController@delete');
        Router::put('/users/{id}/suspend', 'eSpace\App\Controllers\Admin\UserController@suspend');
        Router::put('/users/{id}/restore', 'eSpace\App\Controllers\Admin\UserController@restore');
        
        // Students
        Router::get('/students', 'eSpace\App\Controllers\Admin\StudentController@index');
        Router::get('/students/enrolled', 'eSpace\App\Controllers\Admin\StudentController@enrolled');
        Router::get('/students/analytics', 'eSpace\App\Controllers\Admin\StudentController@analytics');
        Router::post('/students', 'eSpace\App\Controllers\Admin\StudentController@create');
        Router::post('/students/enroll', 'eSpace\App\Controllers\Admin\StudentController@enroll');
        Router::post('/students/enroll-all-departments', 'eSpace\App\Controllers\Admin\StudentController@enrollAllDepartments');
        Router::post('/students/deenroll', 'eSpace\App\Controllers\Admin\StudentController@deenroll');
        Router::post('/students/deenroll-single', 'eSpace\App\Controllers\Admin\StudentController@deenrollSingle');
        Router::post('/students/{id}/regenerate-password', 'eSpace\App\Controllers\Admin\StudentController@regeneratePassword');
        Router::get('/students/{id}', 'eSpace\App\Controllers\Admin\StudentController@show');
        Router::put('/students/{id}', 'eSpace\App\Controllers\Admin\StudentController@update');
        Router::delete('/students/{id}', 'eSpace\App\Controllers\Admin\StudentController@delete');
        
        // Videos
        Router::get('/videos', 'eSpace\App\Controllers\Admin\VideoController@index');
        Router::post('/videos', 'eSpace\App\Controllers\Admin\VideoController@create');
        Router::delete('/videos/{id}', 'eSpace\App\Controllers\Admin\VideoController@delete');

        // Library
        Router::get('/library', 'eSpace\App\Controllers\Admin\LibraryController@index');
        Router::put('/library/{id}', 'eSpace\App\Controllers\Admin\LibraryController@update');
        Router::delete('/library/{id}', 'eSpace\App\Controllers\Admin\LibraryController@delete');

        // Item Bank
        Router::get('/itembank', 'eSpace\App\Controllers\Admin\ItemBankController@index');
        Router::put('/itembank/{id}', 'eSpace\App\Controllers\Admin\ItemBankController@update');
        Router::delete('/itembank/{id}', 'eSpace\App\Controllers\Admin\ItemBankController@delete');

        // Student Promotion
        Router::get('/promotion/students', 'eSpace\App\Controllers\Admin\PromotionController@students');
        Router::post('/promotion/preview', 'eSpace\App\Controllers\Admin\PromotionController@preview');
        Router::post('/promotion/promote', 'eSpace\App\Controllers\Admin\PromotionController@promote');
        Router::get('/promotion/history', 'eSpace\App\Controllers\Admin\PromotionController@history');

        // eNotes
        Router::get('/enotes', 'eSpace\App\Controllers\Admin\ENoteController@index');
        Router::get('/enotes/{id}', 'eSpace\App\Controllers\Admin\ENoteController@show');
        Router::put('/enotes/{id}', 'eSpace\App\Controllers\Admin\ENoteController@update');
        Router::delete('/enotes/{id}', 'eSpace\App\Controllers\Admin\ENoteController@delete');
        
        // Teachers
        Router::get('/teachers', 'eSpace\App\Controllers\Admin\TeacherController@index');
        Router::post('/teachers', 'eSpace\App\Controllers\Admin\TeacherController@create');
        Router::post('/teachers/import', 'eSpace\App\Controllers\Admin\TeacherController@import');
        Router::get('/teachers/{id}', 'eSpace\App\Controllers\Admin\TeacherController@show');
        Router::put('/teachers/{id}', 'eSpace\App\Controllers\Admin\TeacherController@update');
        Router::delete('/teachers/{id}', 'eSpace\App\Controllers\Admin\TeacherController@delete');
        Router::put('/teachers/{id}/suspend', 'eSpace\App\Controllers\Admin\TeacherController@suspend');
        Router::put('/teachers/{id}/restore', 'eSpace\App\Controllers\Admin\TeacherController@restore');
        Router::post('/teachers/{id}/reset-password', 'eSpace\App\Controllers\Admin\TeacherController@resetPassword');
        Router::put('/teachers/{id}/department', 'eSpace\App\Controllers\Admin\TeacherController@assignDepartment');
        Router::put('/teachers/{id}/departments', 'eSpace\App\Controllers\Admin\TeacherController@assignDepartments');
        Router::put('/teachers/{id}/subjects', 'eSpace\App\Controllers\Admin\TeacherController@assignSubjects');
        Router::put('/teachers/{id}/classes', 'eSpace\App\Controllers\Admin\TeacherController@assignClasses');
        
        // HODs
        Router::get('/hods', 'eSpace\App\Controllers\Admin\HODController@index');
        Router::post('/hods', 'eSpace\App\Controllers\Admin\HODController@create');
        Router::post('/hods/assign-teacher', 'eSpace\App\Controllers\Admin\HODController@assignTeacher');
        Router::get('/hods/available-teachers', 'eSpace\App\Controllers\Admin\HODController@availableTeachers');
        Router::post('/hods/{id}/deassign', 'eSpace\App\Controllers\Admin\HODController@deassign');
        Router::get('/hods/{id}', 'eSpace\App\Controllers\Admin\HODController@show');
        Router::put('/hods/{id}', 'eSpace\App\Controllers\Admin\HODController@update');
        Router::delete('/hods/{id}', 'eSpace\App\Controllers\Admin\HODController@delete');
        
        // Departments
        Router::get('/departments', 'eSpace\App\Controllers\Admin\DepartmentController@index');
        Router::post('/departments', 'eSpace\App\Controllers\Admin\DepartmentController@store');
        Router::put('/departments/{id}', 'eSpace\App\Controllers\Admin\DepartmentController@update');
        Router::delete('/departments/{id}', 'eSpace\App\Controllers\Admin\DepartmentController@destroy');
        
        // Subjects
        Router::get('/subjects', 'eSpace\App\Controllers\Admin\SubjectController@index');
        Router::post('/subjects', 'eSpace\App\Controllers\Admin\SubjectController@store');
        Router::put('/subjects/{id}', 'eSpace\App\Controllers\Admin\SubjectController@update');
        Router::delete('/subjects/{id}', 'eSpace\App\Controllers\Admin\SubjectController@destroy');
        
        // Classes
        Router::get('/classes', 'eSpace\App\Controllers\Admin\ClassController@index');
        Router::post('/classes', 'eSpace\App\Controllers\Admin\ClassController@store');
        Router::put('/classes/{id}', 'eSpace\App\Controllers\Admin\ClassController@update');
        Router::delete('/classes/{id}', 'eSpace\App\Controllers\Admin\ClassController@destroy');
        
        // Academic Years
        Router::get('/academic-years', 'eSpace\App\Controllers\Admin\AcademicYearController@index');
        Router::post('/academic-years', 'eSpace\App\Controllers\Admin\AcademicYearController@store');
        Router::put('/academic-years/{id}', 'eSpace\App\Controllers\Admin\AcademicYearController@update');
        Router::delete('/academic-years/{id}', 'eSpace\App\Controllers\Admin\AcademicYearController@destroy');
        Router::get('/academic-years/{id}/terms', 'eSpace\App\Controllers\Admin\AcademicYearController@terms');
        
        // Terms
        Router::get('/terms', 'eSpace\App\Controllers\Admin\TermController@index');
        Router::post('/terms', 'eSpace\App\Controllers\Admin\TermController@store');
        Router::put('/terms/{id}', 'eSpace\App\Controllers\Admin\TermController@update');
        Router::delete('/terms/{id}', 'eSpace\App\Controllers\Admin\TermController@destroy');

        // eNotes Curriculum Setup
        Router::get('/enotes-curriculum/meta', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@meta');
        Router::get('/enotes-curriculum', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@index');
        Router::post('/enotes-curriculum', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@store');
        Router::get('/enotes-curriculum/{id}', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@show');
        Router::put('/enotes-curriculum/{id}', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@update');
        Router::delete('/enotes-curriculum/{id}', 'eSpace\App\Controllers\Admin\ENoteCurriculumController@destroy');

        // Reports
        Router::get('/reports/system', 'eSpace\App\Controllers\Admin\ReportController@system');
        Router::get('/reports/users', 'eSpace\App\Controllers\Admin\ReportController@users');
        Router::get('/reports/activity', 'eSpace\App\Controllers\Admin\ReportController@activity');
        
        // Audit Logs
        Router::get('/audit-logs', 'eSpace\App\Controllers\Admin\AuditLogController@index');
        Router::get('/audit-logs/{id}', 'eSpace\App\Controllers\Admin\AuditLogController@show');
        
        // Permissions
        Router::get('/permissions', 'eSpace\App\Controllers\Admin\PermissionController@index');
        Router::put('/permissions/{id}', 'eSpace\App\Controllers\Admin\PermissionController@update');
        
        // Settings
        Router::get('/settings', 'eSpace\App\Controllers\Admin\SettingsController@index');
        Router::put('/settings', 'eSpace\App\Controllers\Admin\SettingsController@update');
        Router::post('/settings/logo', 'eSpace\App\Controllers\Admin\SettingsController@uploadLogo');

        // Report Cards
        Router::get('/report-cards/terms', 'eSpace\App\Controllers\Admin\ReportCardController@listTerms');
        Router::get('/report-cards/students', 'eSpace\App\Controllers\Admin\ReportCardController@listStudents');
        Router::post('/report-cards/{studentId}/{termId}/generate', 'eSpace\App\Controllers\Admin\ReportCardController@generate');
        Router::get('/report-cards/{studentId}/{termId}', 'eSpace\App\Controllers\Admin\ReportCardController@show');
        Router::put('/report-cards/{studentId}/{termId}/head-teacher-comment', 'eSpace\App\Controllers\Admin\ReportCardController@updateHeadTeacherComment');

        // Performance reports & marksheets (unrestricted - admin can see every subject/class)
        Router::get('/performance/marksheet/download', 'eSpace\App\Controllers\Admin\PerformanceController@downloadMarksheet');
        Router::get('/performance/marksheet', 'eSpace\App\Controllers\Admin\PerformanceController@marksheet');
        Router::get('/performance/students/{studentId}/subjects/{subjectId}', 'eSpace\App\Controllers\Admin\PerformanceController@studentSubject');
        Router::get('/performance/students/{studentId}', 'eSpace\App\Controllers\Admin\PerformanceController@studentGeneral');

        // Rewards & Badges - configurable rules (Admin settings area)
        Router::get('/reward-rules', 'eSpace\App\Controllers\Admin\RewardRuleController@index');
        Router::post('/reward-rules', 'eSpace\App\Controllers\Admin\RewardRuleController@store');
        Router::put('/reward-rules/{id}', 'eSpace\App\Controllers\Admin\RewardRuleController@update');
        Router::delete('/reward-rules/{id}', 'eSpace\App\Controllers\Admin\RewardRuleController@destroy');

        // Rewards & Badges - monitoring/overrides
        Router::get('/rewards', 'eSpace\App\Controllers\Admin\StudentAwardController@index');
        Router::post('/rewards', 'eSpace\App\Controllers\Admin\StudentAwardController@store');
        Router::get('/rewards/{id}', 'eSpace\App\Controllers\Admin\StudentAwardController@show');
        Router::put('/rewards/{id}/override', 'eSpace\App\Controllers\Admin\StudentAwardController@override');
        Router::put('/rewards/{id}/revoke', 'eSpace\App\Controllers\Admin\StudentAwardController@revoke');
        Router::put('/rewards/{id}/restore', 'eSpace\App\Controllers\Admin\StudentAwardController@restore');
        Router::put('/rewards/{id}', 'eSpace\App\Controllers\Admin\StudentAwardController@update');

        // Virtual Lab - oversight (objects catalog, all experiments, analytics)
        Router::get('/virtual-lab/objects', 'eSpace\App\Controllers\Admin\VirtualLabController@objects');
        Router::post('/virtual-lab/objects', 'eSpace\App\Controllers\Admin\VirtualLabController@storeObject');
        Router::put('/virtual-lab/objects/{id}', 'eSpace\App\Controllers\Admin\VirtualLabController@updateObject');
        Router::get('/virtual-lab/experiments', 'eSpace\App\Controllers\Admin\VirtualLabController@experiments');
        Router::put('/virtual-lab/experiments/{id}/status', 'eSpace\App\Controllers\Admin\VirtualLabController@setStatus');
        Router::get('/virtual-lab/experiments/{id}', 'eSpace\App\Controllers\Admin\VirtualLabController@experimentDetail');
        Router::get('/virtual-lab/analytics', 'eSpace\App\Controllers\Admin\VirtualLabController@analytics');

        // Backup
        Router::post('/backup/create', 'eSpace\App\Controllers\Admin\BackupController@create');
        Router::get('/backups', 'eSpace\App\Controllers\Admin\BackupController@index');
        Router::post('/backups/{id}/restore', 'eSpace\App\Controllers\Admin\BackupController@restore');
        Router::delete('/backups/{id}', 'eSpace\App\Controllers\Admin\BackupController@delete');
        
        // System Logs
        Router::get('/logs', 'eSpace\App\Controllers\Admin\LogController@index');
        Router::get('/logs/{file}', 'eSpace\App\Controllers\Admin\LogController@show');
    });

    // Student routes (require student role)
    Router::group(['middleware' => 'auth'], function () {
        Router::get('/student/profile', 'eSpace\App\Controllers\Student\StudentController@profile');
        Router::put('/student/profile', 'eSpace\App\Controllers\Student\StudentController@updateProfile');
    });

    // Presence heartbeat - shared across every role, see PresenceController
    Router::group(['middleware' => 'auth'], function () {
        Router::post('/presence/ping', 'eSpace\App\Controllers\PresenceController@ping');
    });
}); // End of auth group

// Dispatch the request
Router::dispatch();
