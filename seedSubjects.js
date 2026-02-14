import { db } from './src/firebase/config.js';
import { writeBatch, doc, collection } from 'firebase/firestore';
import { COLLECTIONS, PROGRAM_CODES, YEAR_LEVELS, SEMESTERS } from './src/assets/constants.js';

const bsisSubjects = [
  // First Year - First Semester
  { code: 'COMP 1', title: 'Introduction to Computing', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'PROG 1', title: 'Computer Programming 1', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'GE 1', title: 'Mathematics in the Modern World', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'GE 2', title: 'Understanding the Self', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'FIL 1', title: 'Komunikasyon sa Akademikong Filipino', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'PE 1', title: 'Physical Fitness', units: 2, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'NSTP 1', title: 'National Service Training Program 1', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },

  // First Year - Second Semester
  { code: 'IS 1', title: 'Fundamentals of Information Systems', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'PROG 2', title: 'Computer Programming 2', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'WEB 1', title: 'Web Development', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'GE 3', title: 'Readings in Philippine History', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'GE 4', title: 'Purposive Communication', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'FIL 2', title: 'Pagbasa at Pagsulat tungo sa Pananaliksik', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'PE 2', title: 'Rhythmic Activities', units: 2, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'NSTP 2', title: 'National Service Training Program 2', units: 3, yearLevel: YEAR_LEVELS.FIRST_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },

  // Second Year - First Semester
  { code: 'DATASTRUCT 1', title: 'Data Structures and Algorithms', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'PT', title: 'Platform Technologies', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'DM 1', title: 'Organization and Management Concepts', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'ACCTG A', title: 'Fundamentals of Accounting', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'GE 5', title: 'The Contemporary World', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'GE 6', title: 'Art Appreciation', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'GE EL 1', title: 'Living in the IT Era', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'PE 3', title: 'Individual/Dual Sports/Games', units: 2, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },

  // Second Year - Second Semester
  { code: 'HCI', title: 'Human Computer Interaction', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'DM 2', title: 'Financial Management', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'IM 1', title: 'Information Management 1', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'NET 1', title: 'Data Communications and Networking 1', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'MATH 7', title: 'Statistics and Probabilities', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'GE 7', title: 'Science and Technology', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'GE EL 2', title: 'Reading Visual Arts', units: 3, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },
  { code: 'PE 4', title: 'Team Sports/Games', units: 2, yearLevel: YEAR_LEVELS.SECOND_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },

  // Third Year - First Semester
  { code: 'DM 3', title: 'Business Process Management', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'SAD', title: 'System Analysis and Design', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'QM', title: 'Quantitative Methods', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'IS ELEC 1', title: 'IS Elective 1', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'APPSDEV 1', title: 'Application Development and Emerging Technologies 1', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'IS PROF EL 1', title: 'IS Professional Elective 1', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'IS PROF EL 2', title: 'IS Professional Elective 2', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },

  // Third Year - Second Semester
  { code: 'CAPSTONE 1', title: 'Capstone Project 1', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'PROJMGT 1', title: 'IS Project Management 1', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'IS ELEC 2', title: 'IS Elective 2', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'APPSDEV 2', title: 'Application Development and Emerging Technologies 2', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'RESEARCH', title: 'Methods of Research in Computing', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'IS PROF EL 3', title: 'IS Professional Elective 3', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'GE 8', title: 'Ethics', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' },

  // Third Year - Summer
  { code: 'STRATMGT', title: 'IS Strategy, Management and Acquisition', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SUMMER], subjectType: 'Major' },
  { code: 'IS ELEC 3', title: 'IS Elective 3', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SUMMER], subjectType: 'Major' },
  { code: 'SP', title: 'Social Issues and Professional Practice', units: 3, yearLevel: YEAR_LEVELS.THIRD_YEAR, semesterOffered: [SEMESTERS.SUMMER], subjectType: 'Minor' },

  // Fourth Year - First Semester
  { code: 'PROJMGT 2', title: 'IS Project Management 2', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'CAPSTONE 2', title: 'Capstone Project 2', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'IS ELEC 4', title: 'IS Elective 4', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'IS PROF EL 4', title: 'IS Professional Elective 4', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'TECHNO', title: 'Technopreneurship', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Major' },
  { code: 'RIZAL', title: 'Life, Works and Writings of Dr. Jose Rizal', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },
  { code: 'FL', title: 'Foreign Language', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.FIRST], subjectType: 'Minor' },

  // Fourth Year - Second Semester
  { code: 'PRAC', title: 'Practicum', units: 6, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Major' },
  { code: 'SEMTOUR', title: 'Seminars and Tours', units: 3, yearLevel: YEAR_LEVELS.FOURTH_YEAR, semesterOffered: [SEMESTERS.SECOND], subjectType: 'Minor' }
];

const sampleSubjects = bsisSubjects.map((subject) => ({
  ...subject,
  program: PROGRAM_CODES.BSIS,
  lectureUnits: Math.max(1, subject.units - 1),
  labUnits: Math.max(0, subject.units - Math.max(1, subject.units - 1)),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}));

async function seedSubjects() {
  try {
    console.log('Seeding subjects...');

    const batch = writeBatch(db);

    for (const subject of sampleSubjects) {
      const docRef = doc(collection(db, COLLECTIONS.SUBJECTS));
      batch.set(docRef, {
        ...subject,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleSubjects.length} subjects`);
  } catch (error) {
    console.error('Error seeding subjects:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedSubjects();
}

export { seedSubjects, sampleSubjects };
