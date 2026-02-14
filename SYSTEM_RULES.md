# Student Management System - Overall Rules and Guidelines

## 1. Academic Structure Rules

### Programs and Curriculum
- **Supported Programs**: BSIS (Bachelor of Science in Information Systems), BSCS (Bachelor of Science in Computer Science), BSIT (Bachelor of Science in Information Technology), BLIS (Bachelor of Library and Information Science)
- **Year Levels**: 1st Year, 2nd Year, 3rd Year, 4th Year
- **Sections**: A through F (maximum 6 sections per year level)
- **Semesters**: First Semester, Second Semester, Summer Semester

### Subject Management
- **Subject Code Format**: Typically follows pattern like "DM 103", "IT 201", etc.
- **Units Structure**: Total units include lecture and laboratory components
- **Subject Offering**: Subjects are offered based on program, year level, and semester
- **Subject Status**: Active/Inactive status controls availability for enrollment

## 2. Student Enrollment and Management Rules

### Student Registration
- **Student ID Format**: Numeric format like "21-1234" (year enrolled + sequential number)
- **Name Format**: Last Name, First Name M. (Middle Initial) with optional extension name
- **Required Fields**: Student ID, Full Name, Email, Program, Year Level, Section, Status
- **Email Validation**: Must be valid email format and typically institutional email

### Student Status
- **Regular**: Active student meeting all requirements
- **Irregular**: Student with incomplete requirements or special curriculum
- **Transient**: Student temporarily enrolled from another institution
- **Graduated**: Completed program requirements
- **Dropped**: Withdrawn from the program

### Enrollment Status
- **Currently Enrolled**: Boolean flag indicating active enrollment
- **Enrollment Validation**: Only enrolled students can receive grades

## 3. Grading System Rules

### Grade Components
- **Midterm Grade**: First assessment component (0-100 scale)
- **Final Term Grade**: Second assessment component (0-100 scale)
- **Final Grade Calculation**: Average of midterm and final grades
- **Grade Precision**: Final grades displayed with 2 decimal places

### Grade Remarks and Passing Criteria
- **Passing Score**: 74.4 (75% equivalent)
- **Remarks Categories**:
  - PASSED: Final grade >= 74.4
  - FAILED: Final grade < 74.4
  - DROPPED: Student withdrew from subject
  - INCOMPLETE: Missing requirements
  - NOT ATTENDING: No attendance record
  - NO GRADE: No assessment submitted

### Grade Recording Rules
- **Academic Year Format**: YYYY-YYYY (e.g., 2024-2025)
- **Semester Association**: Grades must be linked to specific semester
- **Subject-Student Linkage**: Grades require valid student ID and subject code
- **Instructor Assignment**: Grades include instructor information

## 4. Data Integrity and Validation Rules

### Unique Constraints
- **Student ID**: Must be unique across all students
- **Subject Code**: Must be unique across all subjects
- **Email Addresses**: Should be unique (student emails)

### Required Field Validation
- **Students**: studentId, fullName, email, program, yearLevel, section, status
- **Grades**: studentId, subjectCode, subjectTitle, academicYear, semester, finalGrade, remarks
- **Subjects**: code, title, units, program, yearLevel, isActive

### Data Type Constraints
- **Numeric Fields**: Grades, units must be valid numbers
- **Boolean Fields**: isEnrolled, isActive must be true/false
- **Date Fields**: createdAt, updatedAt use Firestore server timestamps

## 5. System Access and Security Rules

### User Roles (Future Implementation)
- **Administrator**: Full system access, user management
- **Faculty**: Grade entry, student viewing
- **Student**: Personal grade viewing, profile management
- **Registrar**: Student management, enrollment processing

### Data Privacy
- **Student Data**: Protected personal information
- **Grade Confidentiality**: Grades accessible only to authorized personnel
- **Audit Trail**: All changes logged with timestamps

## 6. Academic Progression Rules

### Year Level Advancement
- **Automatic Advancement**: Completion of required units per year level
- **Retention Requirements**: Minimum GPA for advancement
- **Maximum Stay**: Students cannot exceed program duration by more than 2 years

### Subject Prerequisites
- **Prerequisite Validation**: Students must complete prerequisite subjects
- **Corequisite Requirements**: Some subjects require concurrent enrollment

## 7. System Operation Rules

### Data Entry Standards
- **Consistent Formatting**: Use predefined constants for programs, semesters, etc.
- **Bulk Operations**: Support for batch student/grade imports
- **Data Validation**: Real-time validation during form submission

### Reporting and Analytics
- **Grade Reports**: By student, subject, program, semester
- **Enrollment Reports**: Active students, program distribution
- **Academic Performance**: GPA calculations, pass/fail ratios

### Backup and Recovery
- **Regular Backups**: Automated Firebase backups
- **Data Retention**: Academic records retained for 7 years
- **Disaster Recovery**: Cloud-based redundancy

## 8. Integration and API Rules

### Firebase/Firestore Integration
- **Collection Structure**: Separate collections for students, grades, subjects
- **Query Optimization**: Use appropriate indexes for common queries
- **Real-time Updates**: Live data synchronization

### External System Integration
- **SIS Integration**: Compatible with Student Information Systems
- **LMS Integration**: Learning Management System connectivity
- **Email Notifications**: Automated alerts for important events

## 9. Performance and Scalability Rules

### Query Limits
- **Default Limit**: 50 records per page
- **Export Limit**: 1000 records for bulk operations
- **Batch Processing**: 500 records for bulk updates

### Caching Strategy
- **Static Data**: Constants cached in application
- **Frequently Accessed**: Recent grades/students cached
- **Session Management**: User session data cached

## 10. Maintenance and Update Rules

### System Updates
- **Version Control**: All changes tracked in Git
- **Testing Requirements**: Unit tests for critical functions
- **Deployment Process**: Staged deployment with rollback capability

### Data Migration
- **Schema Updates**: Backward-compatible changes
- **Data Transformation**: Automated migration scripts
- **Validation Checks**: Post-migration data integrity verification

This document serves as the comprehensive rulebook for the Student Management System. All system components, user interactions, and data operations must adhere to these guidelines to ensure consistency, accuracy, and reliability.
