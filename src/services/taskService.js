import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';
import { db } from './firebase';

const COL = 'tasks';

export const subscribeToTasks = (userId, callback) => {
    const q = query(
        collection(db, COL),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate(),
            dueDate: d.data().dueDate?.toDate()
        }));
        callback(items);
    });
};

export const createTask = async (userId, taskData) => {
    try {
        const ref = await addDoc(collection(db, COL), {
            ...taskData,
            userId,
            completed: false,
            createdAt: serverTimestamp()
        });
        return { success: true, id: ref.id };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const updateTask = async (taskId, updates) => {
    try {
        await updateDoc(doc(db, COL, taskId), updates);
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, COL, taskId));
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const getTaskById = async (taskId) => {
    try {
        const snap = await getDoc(doc(db, COL, taskId));
        if (snap.exists()) {
            return {
                success: true,
                task: {
                    id: snap.id,
                    ...snap.data(),
                    createdAt: snap.data().createdAt?.toDate(),
                    dueDate: snap.data().dueDate?.toDate()
                }
            };
        }
        return { success: false, error: 'Tarea no encontrada' };
    } catch (err) {
        return { success: false, error: err.message };
    }
};
