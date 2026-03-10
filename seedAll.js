import { seedProspectus } from './seedProspectus.js';
import { seedStudents } from './seedStudents.js';
import { seedSubjects } from './seedSubjects.js';
import { seedGrades } from './seedGrades.js';
import { seedInstructors } from './seedInstructors.js';
import { seedAcademicCalendar } from './seedAcademicCalendar.js';
import { seedRBAC } from './seedRBAC.js';
import { seedDepartments } from './seedDepartments.js';
import { seedPrograms } from './seedPrograms.js';
import { seedAnnouncements } from './seedAnnouncements.js';
import { seedGradeInquiryTickets } from './seedGradeInquiryTickets.js';
import { seedInstructorDocuments } from './seedInstructorDocuments.js';
import { seedGradesFromFiles } from './seedGradesFromFiles.js';
import { seedGradesFromSheets } from './seedGradesFromSheets.js';
import { seedDm103FromCsv } from './seedDM103FromCsv.js';
import { db } from './src/firebase/config.js';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const EXTRA_COLLECTIONS = ['gradeUploads', 'serviceRequests', 'gradeInquiryTickets'];

async function clearCollection(name) {
  const colRef = collection(db, name);
  const snapshot = await getDocs(colRef);
  if (snapshot.empty) return;

  let batch = writeBatch(db);
  let count = 0;
  snapshot.forEach((docSnap) => {
    batch.delete(docSnap.ref);
    count += 1;
    if (count % 400 === 0) {
      batch.commit();
      batch = writeBatch(db);
    }
  });
  await batch.commit();
}

async function clearAllCollections() {
  const collections = [...Object.values(COLLECTIONS), ...EXTRA_COLLECTIONS];
  for (const name of collections) {
    await clearCollection(name);
  }
}

async function seedAllData() {
  try {
    console.log('Starting complete database seeding...');

    console.log('Clearing existing collections...');
    await clearAllCollections();
    console.log('Collections cleared.');

    await seedProspectus();
    console.log('Prospectus seeded successfully');

    await seedDepartments();
    console.log('Departments seeded successfully');

    await seedPrograms();
    console.log('Programs seeded successfully');

    await seedAnnouncements();
    console.log('Announcements seeded successfully');

    await seedStudents();
    console.log('Students seeded successfully');

    await seedGradeInquiryTickets();
    console.log('Grade inquiry tickets seeded successfully');

    await seedSubjects();
    console.log('Subjects seeded successfully');

    await seedInstructors();
    console.log('Instructors seeded successfully');

    await seedInstructorDocuments();
    console.log('Instructor document links seeded successfully');

    await seedAcademicCalendar();
    console.log('Academic calendar seeded successfully');

    await seedGrades();
    console.log('Grades seeded successfully');

    await seedGradesFromFiles();
    console.log('Grades from Excel files seeded successfully');

    await seedGradesFromSheets();
    console.log('Grades from Sheets (grades, section, student id only) seeded successfully');

    await seedDm103FromCsv('./data/dm103-final.csv');
    console.log('DM103 grades and students (BSIS 3A-3F) seeded successfully');

    await seedRBAC();
    console.log('RBAC data seeded successfully');

    console.log('All data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedAllData();
}

export { seedAllData };
