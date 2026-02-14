// Aggregated constants from outside_composed folder for Student Management System

// From deepseek_javascript_20260212_071139.js
export const STUDENT_STATUS = {
    REGULAR: 'Regular',
    IRREGULAR: 'Irregular',
    TRANSIENT: 'Transient',
    GRADUATED: 'Graduated',
    DROPPED: 'Dropped'
};

export const STUDENT_FIELDS = {
    STUDENT_ID: 'studentId',
    FULL_NAME: 'fullName',
    LAST_NAME: 'lastName',
    FIRST_NAME: 'firstName',
    MIDDLE_NAME: 'middleName',
    EXTENSION_NAME: 'extensionName', // Jr., Sr., III, etc.
    EMAIL: 'email',
    PROGRAM: 'program',
    YEAR_LEVEL: 'yearLevel',
    SECTION: 'section',
    STATUS: 'status',
    ENROLLMENT_DATE: 'enrollmentDate',
    LAST_ENROLLED_AY: 'lastEnrolledAcademicYear',
    LAST_ENROLLED_SEM: 'lastEnrolledSemester',
    IS_ENROLLED: 'isEnrolled'
};

// From deepseek_javascript_20260212_88f3eb.js
export const SEMESTERS = {
    FIRST: '1st Sem',
    SECOND: '2nd Sem',
    SUMMER: 'Summer'
};

export const YEAR_LEVELS = {
    FIRST_YEAR: '1st Year',
    SECOND_YEAR: '2nd Year',
    THIRD_YEAR: '3rd Year',
    FOURTH_YEAR: '4th Year'
};

export const PROGRAM_CODES = {
    BSIS: 'BSIS',
    BSCS: 'BSCS',
    BSIT: 'BSIT',
    BLIS: 'BLIS'
};

export const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];

// From deepseek_javascript_20260212_860cff.js
export const GRADE_STATUS = {
    PASSED: 'Passed',
    FAILED: 'Failed',
    DROPPED: 'DROP',
    INCOMPLETE: 'Incomplete',
    NOT_ATTENDING: 'Not Attending',
    NO_GRADE: ''
};

export const GRADE_TYPE = {
    MIDTERM: 'midterm',
    FINAL: 'final',
    FINAL_GRADE: 'finalGrade',
    REMOVAL: 'removal',
    RE_EXAM: 'reexam'
};

export const GRADE_REMARKS = {
    PASSED: 'Passed',
    FAILED: 'Failed',
    DROPPED: 'DROPPED',
    INCOMPLETE: 'INC',
    NOT_ATTENDING: 'NA'
};

export const GRADE_PASSING_SCORE = 74.4; // 75 passing rate

export const GRADE_FIELDS = {
    STUDENT_ID: 'studentId',
    SUBJECT_CODE: 'subjectCode',
    SUBJECT_TITLE: 'subjectTitle',
    INSTRUCTOR_ID: 'instructorId',
    ACADEMIC_YEAR: 'academicYear',
    SEMESTER: 'semester',
    PROGRAM_YR_SEC: 'programYearSection',
    MIDTERM_GRADE: 'midtermGrade',
    FINAL_TERM_GRADE: 'finalTermGrade',
    FINAL_GRADE: 'finalGrade',
    REMARKS: 'remarks',
    DATE_ENCODED: 'dateEncoded',
    DATE_MODIFIED: 'dateModified',
    ENCODED_BY: 'encodedBy'
};

// From deepseek_javascript_20260212_26887a.js
export const SUBJECT_FIELDS = {
    CODE: 'code',
    TITLE: 'title',
    UNITS: 'units',
    LECTURE_UNITS: 'lectureUnits',
    LAB_UNITS: 'labUnits',
    PRE_REQUISITE: 'preRequisite',
    CO_REQUISITE: 'coRequisite',
    PROGRAM: 'program',
    YEAR_LEVEL: 'yearLevel',
    SEMESTER_OFFERED: 'semesterOffered',
    IS_ACTIVE: 'isActive'
};





// From deepseek_javascript_20260212_5dfffc.js
export const QUERY_LIMITS = {
    DEFAULT: 50,
    EXPORT: 1000,
    BATCH_PROCESS: 500
};

export const ORDER_DIRECTIONS = {
    ASCENDING: 'asc',
    DESCENDING: 'desc'
};

// Common query filters
export const QUERY_FILTERS = {
    ACTIVE_STUDENTS: ['status', '==', STUDENT_STATUS.REGULAR],
    PASSING_GRADES: ['finalGrade', '>', GRADE_PASSING_SCORE],
    CURRENT_SEMESTER: ['semester', '==', SEMESTERS.FIRST],
    CURRENT_AY: ['academicYear', '==', '2025-2026']
};

// From deepseek_javascript_20260212_15ed21.js
export const COLLECTIONS = {
    STUDENTS: 'students',
    GRADES: 'grades',
    SUBJECTS: 'subjects',
    INSTRUCTORS: 'instructors',
    PROSPECTUS: 'prospectus',
    PROGRAMS: 'programs',
    ACADEMIC_YEARS: 'academicYears', // Used for calendar events
    DEPARTMENTS: 'departments',
    ROLES: 'roles',
    USER_ROLES: 'userRoles',
    ANNOUNCEMENTS: 'announcements'
};

export const SUBCOLLECTIONS = {
    STUDENT_GRADES: 'studentGrades',
    SUBJECT_OFFERINGS: 'subjectOfferings',
    GRADE_HISTORY: 'gradeHistory'
};

// From deepseek_javascript_20260212_58fde1.js
export const INSTRUCTOR_FIELDS = {
    INSTRUCTOR_ID: 'instructorId',
    FULL_NAME: 'fullName',
    LAST_NAME: 'lastName',
    FIRST_NAME: 'firstName',
    MIDDLE_NAME: 'middleName',
    EXTENSION: 'extension',
    QUALIFICATIONS: 'qualifications',
    DEPARTMENT: 'department',
    EMAIL: 'email',
    EMPLOYMENT_STATUS: 'employmentStatus',
    SPECIALIZATION: 'specialization'
};

export const CURRENT_INSTRUCTOR = {
    FULL_NAME: 'SANTIAGO, FELICIANO L. JR, MSIT',
    LAST_NAME: 'SANTIAGO',
    FIRST_NAME: 'FELICIANO',
    MIDDLE_NAME: 'L',
    EXTENSION: 'JR',
    QUALIFICATIONS: 'MSIT',
    DEPARTMENT: 'Information Systems'
};



export const CURRENT_SUBJECT = {
    CODE: 'DM 103',
    TITLE: 'Business Process Management (Using Oracle)',
    UNITS: 3,
    PROGRAM: 'BSIS',
    YEAR_LEVEL: '3',
    SECTION: 'F'
};

// From deepseek_javascript_20260212_b3386b.js
export const gradeUtils = {
    // Compute final grade from midterm and final
    computeFinalGrade: (midterm, final) => {
        if (typeof midterm === 'number' && typeof final === 'number') {
            return (midterm + final) / 2;
        }
        return null;
    },

    // Determine remarks based on final grade
    getRemarks: (finalGrade) => {
        if (typeof finalGrade === 'number') {
            return finalGrade > GRADE_PASSING_SCORE ? GRADE_REMARKS.PASSED : GRADE_REMARKS.FAILED;
        }
        return GRADE_STATUS.NO_GRADE;
    },

    // Parse student name components
    parseStudentName: (fullName) => {
        const parts = fullName.split(',').map(part => part.trim());
        if (parts.length >= 2) {
            const lastName = parts[0];
            const firstMiddle = parts[1].split(' ');
            const firstName = firstMiddle[0];
            const middleName = firstMiddle.length > 1 ? firstMiddle.slice(1).join(' ') : '';
            const extensionName = parts.length > 2 ? parts[2] : '';

            return { lastName, firstName, middleName, extensionName };
        }
        return { lastName: fullName, firstName: '', middleName: '', extensionName: '' };
    }
};

// Default student document template (client-side)
export const studentTemplate = {
    [STUDENT_FIELDS.STUDENT_ID]: '',
    [STUDENT_FIELDS.FULL_NAME]: '',
    [STUDENT_FIELDS.LAST_NAME]: '',
    [STUDENT_FIELDS.FIRST_NAME]: '',
    [STUDENT_FIELDS.MIDDLE_NAME]: '',
    [STUDENT_FIELDS.EXTENSION_NAME]: '',
    [STUDENT_FIELDS.EMAIL]: '',
    [STUDENT_FIELDS.PROGRAM]: PROGRAM_CODES.BSIS,
    [STUDENT_FIELDS.YEAR_LEVEL]: '',
    [STUDENT_FIELDS.SECTION]: '',
    [STUDENT_FIELDS.STATUS]: STUDENT_STATUS.REGULAR,
    [STUDENT_FIELDS.IS_ENROLLED]: false
};

// Default grade document template (client-side)
export const gradeTemplate = {
    [GRADE_FIELDS.STUDENT_ID]: '',
    [GRADE_FIELDS.SUBJECT_CODE]: '',
    [GRADE_FIELDS.SUBJECT_TITLE]: '',
    [GRADE_FIELDS.INSTRUCTOR_ID]: '',
    [GRADE_FIELDS.ACADEMIC_YEAR]: '',
    [GRADE_FIELDS.SEMESTER]: SEMESTERS.FIRST,
    [GRADE_FIELDS.PROGRAM_YR_SEC]: '',
    [GRADE_FIELDS.MIDTERM_GRADE]: null,
    [GRADE_FIELDS.FINAL_TERM_GRADE]: null,
    [GRADE_FIELDS.FINAL_GRADE]: null,
    [GRADE_FIELDS.REMARKS]: ''
};

// Default subject document template (client-side)
export const subjectTemplate = {
    [SUBJECT_FIELDS.CODE]: '',
    [SUBJECT_FIELDS.TITLE]: '',
    [SUBJECT_FIELDS.UNITS]: 0,
    [SUBJECT_FIELDS.LECTURE_UNITS]: 0,
    [SUBJECT_FIELDS.LAB_UNITS]: 0,
    [SUBJECT_FIELDS.PROGRAM]: PROGRAM_CODES.BSIS,
    [SUBJECT_FIELDS.YEAR_LEVEL]: '',
    [SUBJECT_FIELDS.SEMESTER_OFFERED]: [],
    [SUBJECT_FIELDS.IS_ACTIVE]: true
};
