import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const sampleRoles = [
  {
    id: 'role_admin',
    name: 'Administrator',
    description: 'Full system access including user management, system configuration, and all academic operations',
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete',
      'students.create', 'students.read', 'students.update', 'students.delete',
      'instructors.create', 'instructors.read', 'instructors.update', 'instructors.delete',
      'subjects.create', 'subjects.read', 'subjects.update', 'subjects.delete',
      'grades.create', 'grades.read', 'grades.update', 'grades.delete',
      'prospectus.create', 'prospectus.read', 'prospectus.update', 'prospectus.delete',
      'academic_calendar.create', 'academic_calendar.read', 'academic_calendar.update', 'academic_calendar.delete',
      'reports.view', 'system.settings', 'audit.logs'
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'role_instructor',
    name: 'Instructor',
    description: 'Teaching staff with access to student grades, subject management, and class information',
    permissions: [
      'students.read', 'instructors.read',
      'subjects.read', 'grades.create', 'grades.read', 'grades.update',
      'prospectus.read', 'academic_calendar.read',
      'reports.view'
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'role_student',
    name: 'Student',
    description: 'Students with access to their personal information, grades, and academic records',
    permissions: [
      'students.read', 'grades.read', 'subjects.read',
      'prospectus.read', 'academic_calendar.read'
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'role_registrar',
    name: 'Registrar',
    description: 'Administrative staff handling student enrollment and academic records',
    permissions: [
      'students.create', 'students.read', 'students.update', 'students.delete',
      'grades.create', 'grades.read', 'grades.update', 'grades.delete',
      'subjects.read', 'prospectus.create', 'prospectus.read', 'prospectus.update', 'prospectus.delete',
      'academic_calendar.create', 'academic_calendar.read', 'academic_calendar.update', 'academic_calendar.delete',
      'reports.view', 'audit.logs'
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const sampleUserRoles = [
  {
    userId: 'admin_user_001',
    email: 'admin@bcc.edu.ph',
    roleId: 'role_admin',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'INST-001',
    email: 'feliciano.santiago@school.edu.ph',
    roleId: 'role_instructor',
    assignedBy: 'admin_user_001',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: '2bXJGnQas8d23eqs2KsYYFJKh1H2',
    email: 'faculty.member@bcc.edu.ph',
    roleId: 'role_instructor',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: '21-1234',
    email: 'juan.delacruz@school.edu.ph',
    roleId: 'role_student',
    assignedBy: 'admin_user_001',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: '21_1234',
    email: 'juan.delacruz@school.edu.ph',
    roleId: 'role_student',
    assignedBy: 'admin_user_001',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'registrar_user_001',
    email: 'registrar@bcc.edu.ph',
    roleId: 'role_registrar',
    assignedBy: 'admin_user_001',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'dev_admin',
    email: 'dev.admin@bcc.edu.ph',
    roleId: 'role_admin',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'dev_instructor',
    email: 'dev.instructor@bcc.edu.ph',
    roleId: 'role_instructor',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'dev_student',
    email: 'dev.student@bcc.edu.ph',
    roleId: 'role_student',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'dev_registrar',
    email: 'dev.registrar@bcc.edu.ph',
    roleId: 'role_registrar',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 'DRmpYaPuqoOOKpy8YwbHQfRL8M03',
    email: 'instructor.dr@bcc.edu.ph',
    roleId: 'role_instructor',
    assignedBy: 'system',
    assignedAt: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedRBAC() {
  try {
    console.log('Seeding RBAC data...');

    const batch = writeBatch(db);

    // Seed roles
    for (const role of sampleRoles) {
      const docRef = doc(db, COLLECTIONS.ROLES, role.id);
      batch.set(docRef, role);
    }

    // Seed user roles
    for (const userRole of sampleUserRoles) {
      const docRef = doc(db, COLLECTIONS.USER_ROLES, `${userRole.userId}_${userRole.roleId}`);
      batch.set(docRef, userRole);
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleRoles.length} roles and ${sampleUserRoles.length} user role assignments`);
  } catch (error) {
    console.error('Error seeding RBAC data:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedRBAC();
}

export { seedRBAC, sampleRoles, sampleUserRoles };
