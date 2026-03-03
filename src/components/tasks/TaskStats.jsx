import { useTaskStore } from "../../store/taskStore";
import { isOverdue } from "../../utils/dateHelpers";

export default function TaskStats() {
    const tasks = useTaskStore((state) => state.tasks);

    const totalCount = tasks.length;
    const doneCount = tasks.filter((t) => t.completed).length;
    const pendingCount = totalCount - doneCount;
    const overdueCount = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;
    const completionRate = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Completadas</p>
                <p className="text-2xl font-bold text-green-600">{doneCount}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Vencidas</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
            <div className="card text-center p-4 col-span-2 md:col-span-1">
                <p className="text-gray-500 text-sm font-medium">Progreso</p>
                <p className="text-2xl font-bold text-indigo-600">{completionRate}%</p>
            </div>
        </div>
    );
}
