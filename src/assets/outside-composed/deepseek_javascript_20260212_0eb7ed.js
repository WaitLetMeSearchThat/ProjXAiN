// Student Document Template
const studentTemplate = {
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
    [STUDENT_FIELDS.IS_ENROLLED]: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
};

// Grade Document Template
const gradeTemplate = {
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
    [GRADE_FIELDS.REMARKS]: '',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
};

// Subject Document Template
const subjectTemplate = {
    [SUBJECT_FIELDS.CODE]: '',
    [SUBJECT_FIELDS.TITLE]: '',
    [SUBJECT_FIELDS.UNITS]: 0,
    [SUBJECT_FIELDS.LECTURE_UNITS]: 0,
    [SUBJECT_FIELDS.LAB_UNITS]: 0,
    [SUBJECT_FIELDS.PROGRAM]: PROGRAM_CODES.BSIS,
    [SUBJECT_FIELDS.YEAR_LEVEL]: '',
    [SUBJECT_FIELDS.SEMESTER_OFFERED]: [],
    [SUBJECT_FIELDS.IS_ACTIVE]: true,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
};