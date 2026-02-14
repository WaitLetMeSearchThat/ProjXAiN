const gradeUtils = {
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