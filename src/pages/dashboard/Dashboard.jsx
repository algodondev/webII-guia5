import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { useTasks } from "../../hooks/useTasks";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import TaskStats from "../../components/tasks/TaskStats";

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const { tasks, activeFilter, activeCategory, searchQuery, loading } =
        useTaskStore();

    useTasks();

    const q = searchQuery.toLowerCase();
    const filteredTasks = tasks.filter((task) => {
        if (activeFilter === "completed" && !task.completed) return false;
        if (activeFilter === "pending" && task.completed) return false;
        if (activeCategory !== "all" && task.category !== activeCategory) return false;

        if (searchQuery) {
            const inTitle = task.title.toLowerCase().includes(q);
            const inDesc = task.description?.toLowerCase().includes(q) || false;
            if (!inTitle && !inDesc) return false;
        }

        return true;
    });

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Bienvenido, {user?.displayName || "Usuario"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Tienes {tasks.filter((t) => !t.completed).length} tareas
                    pendientes
                </p>
            </div>
            <TaskFilters />
            <TaskStats />
            <TaskList tasks={filteredTasks} />
        </div>
    );
}
