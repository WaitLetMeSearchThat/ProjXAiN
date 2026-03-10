import { app, db } from './src/firebase/config.js';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const STUDENT_ROLE_ID = 'role_student';

const toSafePassword = (studentId) => {
  const raw = String(studentId || '').trim();
  if (!raw) return '';
  return raw;
};

async function upsertStudentRole({ userId, studentId, email }) {
  if (!studentId || !email) return;

  const now = new Date();
  const roleDocId = `${userId || studentId}_${STUDENT_ROLE_ID}`;
  const roleRef = doc(db, COLLECTIONS.USER_ROLES, roleDocId);

  await setDoc(
    roleRef,
    {
      userId,
      studentId,
      email,
      roleId: STUDENT_ROLE_ID,
      assignedBy: 'seedStudentAuth',
      assignedAt: now,
      isActive: true,
      mustChangePassword: true,
      updatedAt: now
    },
    { merge: true }
  );
}

async function findAnyStudentRoleByEmail(email) {
  const q = query(collection(db, COLLECTIONS.USER_ROLES), where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}

async function seedStudentAuth() {
  const auth = getAuth(app);
  let total = 0;
  let created = 0;
  let existing = 0;
  let skipped = 0;
  let failed = 0;

  try {
    console.log('Seeding student authentication accounts...');
    const studentsSnapshot = await getDocs(collection(db, COLLECTIONS.STUDENTS));

    for (const studentDoc of studentsSnapshot.docs) {
      total += 1;
      const data = studentDoc.data() || {};
      const studentId = String(data.studentId || studentDoc.id || '').trim();
      const email = String(data.email || '').trim().toLowerCase();
      const password = toSafePassword(studentId);

      if (!studentId || !email || !password || password.length < 6) {
        skipped += 1;
        continue;
      }

      try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        created += 1;
        await upsertStudentRole({
          userId: credential.user.uid,
          studentId,
          email
        });
      } catch (error) {
        if (error?.code === 'auth/email-already-in-use') {
          existing += 1;
          const existingRole = await findAnyStudentRoleByEmail(email);
          await upsertStudentRole({
            userId: String(existingRole?.userId || ''),
            studentId,
            email
          });
        } else {
          failed += 1;
          console.error(`Failed auth seed for ${studentId} (${email}):`, error?.message || error);
        }
      } finally {
        try {
          await signOut(auth);
        } catch (_) {
          // ignore sign-out issues in seeding loop
        }
      }
    }

    console.log(
      `Student auth seeding done. total=${total}, created=${created}, existing=${existing}, skipped=${skipped}, failed=${failed}`
    );
    console.log('Login format: email=<student email>, password=<studentId>');
  } catch (error) {
    console.error('Error seeding student auth:', error);
  }
}

if (process.argv[2] === '--run') {
  seedStudentAuth();
}

export { seedStudentAuth };
