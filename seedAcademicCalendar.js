import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const sampleAcademicCalendar = [
  {
    id: 'cal_2026_enrollment_deadline',
    academicYear: '2025-2026',
    semester: '1st Semester',
    eventType: 'Enrollment',
    eventName: 'Enrollment Deadline',
    startDate: new Date('2025-08-15'),
    endDate: new Date('2025-08-20'),
    description: 'Deadline for student enrollment for 1st Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_classes_start',
    academicYear: '2025-2026',
    semester: '1st Semester',
    eventType: 'Academic',
    eventName: 'Classes Start',
    startDate: new Date('2025-08-25'),
    endDate: new Date('2025-08-25'),
    description: 'First day of classes for 1st Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_midterm_exams',
    academicYear: '2025-2026',
    semester: '1st Semester',
    eventType: 'Examination',
    eventName: 'Midterm Examinations',
    startDate: new Date('2025-10-20'),
    endDate: new Date('2025-10-25'),
    description: 'Midterm examination period for 1st Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_finals',
    academicYear: '2025-2026',
    semester: '1st Semester',
    eventType: 'Examination',
    eventName: 'Final Examinations',
    startDate: new Date('2025-12-15'),
    endDate: new Date('2025-12-20'),
    description: 'Final examination period for 1st Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_semester_end',
    academicYear: '2025-2026',
    semester: '1st Semester',
    eventType: 'Academic',
    eventName: 'Semester End',
    startDate: new Date('2025-12-21'),
    endDate: new Date('2025-12-21'),
    description: 'End of 1st Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_second_sem_enrollment',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    eventType: 'Enrollment',
    eventName: 'Enrollment Deadline',
    startDate: new Date('2026-01-05'),
    endDate: new Date('2026-01-10'),
    description: 'Deadline for student enrollment for 2nd Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cal_2026_second_sem_start',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    eventType: 'Academic',
    eventName: 'Classes Start',
    startDate: new Date('2026-01-15'),
    endDate: new Date('2026-01-15'),
    description: 'First day of classes for 2nd Semester 2025-2026',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedAcademicCalendar() {
  try {
    console.log('Seeding academic calendar...');

    const batch = writeBatch(db);

    for (const event of sampleAcademicCalendar) {
      const docRef = doc(db, COLLECTIONS.ACADEMIC_YEARS, event.id);
      batch.set(docRef, event);
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleAcademicCalendar.length} academic calendar events`);
  } catch (error) {
    console.error('Error seeding academic calendar:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedAcademicCalendar();
}

export { seedAcademicCalendar, sampleAcademicCalendar };
