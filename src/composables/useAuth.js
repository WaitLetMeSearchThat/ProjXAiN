import { ref, computed } from 'vue';
import { auth, db } from '../firebase/config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../assets/constants';

const user = ref(null);
const role = ref(null);
const loading = ref(true);
const userProfile = ref(null);
// Derived auth state for convenience
const isAuthenticated = computed(() => Boolean(user.value));
const isInitialized = computed(() => loading.value === false);
const SESSION_DURATION_MS = 4 * 60 * 60 * 1000;
const STUDENT_ROLE = 'role_student';

const isProfileExpired = (profile) => {
  if (!profile?.expiresAt) return true;
  const expiresAt = Date.parse(profile.expiresAt);
  if (Number.isNaN(expiresAt)) return true;
  return Date.now() >= expiresAt;
};

const persistProfile = (profile) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
  userProfile.value = profile;
};

const upsertSessionProfile = (patch) => {
  const existing = userProfile.value || {};
  const merged = {
    ...existing,
    ...patch,
    expiresAt: existing.expiresAt || new Date(Date.now() + SESSION_DURATION_MS).toISOString()
  };
  persistProfile(merged);
};

const loadProfileFromStorage = () => {
  try {
    const raw = localStorage.getItem('userProfile');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && isProfileExpired(parsed)) {
      localStorage.removeItem('userProfile');
      userProfile.value = null;
      return;
    }
    userProfile.value = parsed;
  } catch (err) {
    console.warn('Failed to parse userProfile from storage', err);
    userProfile.value = null;
  }
};

const fetchRoleAssignment = async (uid, email) => {
  const byUserId = query(
    collection(db, COLLECTIONS.USER_ROLES),
    where('userId', '==', uid)
  );
  let snapshot = await getDocs(byUserId);

  if (snapshot.empty && email) {
    const byEmail = query(
      collection(db, COLLECTIONS.USER_ROLES),
      where('email', '==', String(email).toLowerCase())
    );
    snapshot = await getDocs(byEmail);
  }

  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
};

const applyRoleAssignmentToSession = (assignment) => {
  if (!assignment) {
    role.value = null;
    upsertSessionProfile({
      role: null,
      mustChangePassword: false
    });
    return;
  }

  role.value = assignment.roleId || null;
  upsertSessionProfile({
    role: assignment.roleId || null,
    mustChangePassword: Boolean(assignment.mustChangePassword)
  });
};

// Initialize auth listener once
onAuthStateChanged(auth, async (currentUser) => {
  user.value = currentUser;
  loadProfileFromStorage();

  if (currentUser) {
    if (userProfile.value && isProfileExpired(userProfile.value)) {
      await signOut(auth);
      localStorage.removeItem('userProfile');
      user.value = null;
      role.value = null;
      loading.value = false;
      return;
    }
    if (!userProfile.value) {
      upsertSessionProfile({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || ''
      });
    }
    try {
      const assignment = await fetchRoleAssignment(currentUser.uid, currentUser.email);
      applyRoleAssignmentToSession(assignment);
    } catch (error) {
      console.error("Error fetching user role:", error);
      role.value = null;
    }
  } else {
    role.value = null;
  }
  loading.value = false;
});

const login = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Fetch role from Firestore after login
    try {
      const assignment = await fetchRoleAssignment(result.user.uid, result.user.email);
      const roleId = assignment?.roleId || null;
      role.value = roleId;
      const mustChangePassword = Boolean(assignment?.mustChangePassword);
      
      if (!userProfile.value || isProfileExpired(userProfile.value)) {
        upsertSessionProfile({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || '',
          role: roleId,
          mustChangePassword
        });
      } else {
        // Update existing profile with role
        upsertSessionProfile({
          role: roleId,
          mustChangePassword
        });
      }
    } catch (roleError) {
      console.error("Error fetching role after login:", roleError);
    }
    
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!userProfile.value || isProfileExpired(userProfile.value)) {
      upsertSessionProfile({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || userProfile.value?.displayName || ''
      });
    }
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const registerWithRole = async (email, password, displayName, roleId, studentId = null) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });

    // Save user profile to localStorage
    const profile = {
      uid: result.user.uid,
      email: result.user.email,
      displayName,
      role: roleId,
      studentId,
      mustChangePassword: false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_DURATION_MS).toISOString()
    };
    persistProfile(profile);

    // Assign role in Firestore
    await setDoc(doc(db, COLLECTIONS.USER_ROLES, `${result.user.uid}_${roleId}`), {
      userId: result.user.uid,
      email: result.user.email,
      roleId,
      studentId: studentId || null,
      assignedBy: 'system',
      assignedAt: new Date(),
      isActive: true,
      mustChangePassword: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const completeInitialPasswordSetup = async (currentPassword, newPassword) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser?.email) {
      return { success: false, error: 'No authenticated user found.' };
    }
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters.' };
    }

    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);

    const byUserId = query(
      collection(db, COLLECTIONS.USER_ROLES),
      where('userId', '==', currentUser.uid)
    );
    let snapshot = await getDocs(byUserId);

    if (snapshot.empty) {
      const byEmail = query(
        collection(db, COLLECTIONS.USER_ROLES),
        where('email', '==', String(currentUser.email).toLowerCase())
      );
      snapshot = await getDocs(byEmail);
    }

    const updates = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() || {};
      if (data.roleId === STUDENT_ROLE) {
        updates.push(
          updateDoc(docSnap.ref, {
            mustChangePassword: false,
            passwordChangedAt: new Date(),
            updatedAt: new Date()
          })
        );
      }
    });
    await Promise.all(updates);

    upsertSessionProfile({ mustChangePassword: false });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to update password.' };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userProfile');
    userProfile.value = null;
    role.value = null;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export function useAuth() {
  return {
    user,
    role,
    loading,
    userProfile,
    isAuthenticated,
    isInitialized,
    login,
    loginWithGoogle,
    registerWithRole,
    completeInitialPasswordSetup,
    logout
  };
}
