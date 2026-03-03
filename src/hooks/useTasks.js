import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { subscribeToTasks } from '../services/taskService';

export const useTasks = () => {
    const user = useAuthStore((state) => state.user);
    const { replaceTasks, setLoading } = useTaskStore();

    useEffect(() => {
        if (!user) return;
        setLoading(true);

        const unsubscribe = subscribeToTasks(user.uid, (items) => {
            replaceTasks(items);
        });

        return () => unsubscribe();
    }, [user, replaceTasks, setLoading]);
};
