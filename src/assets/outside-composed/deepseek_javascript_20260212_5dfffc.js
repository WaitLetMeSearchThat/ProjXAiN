const QUERY_LIMITS = {
    DEFAULT: 50,
    EXPORT: 1000,
    BATCH_PROCESS: 500
};

const ORDER_DIRECTIONS = {
    ASCENDING: 'asc',
    DESCENDING: 'desc'
};

// Common query filters
const QUERY_FILTERS = {
    ACTIVE_STUDENTS: ['status', '==', STUDENT_STATUS.REGULAR],
    PASSING_GRADES: ['finalGrade', '>', GRADE_PASSING_SCORE],
    CURRENT_SEMESTER: ['semester', '==', SEMESTERS.FIRST],
    CURRENT_AY: ['academicYear', '==', '2025-2026']
};