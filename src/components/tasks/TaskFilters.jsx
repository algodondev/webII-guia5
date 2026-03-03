import { useTaskStore } from "../../store/taskStore";
import { FILTERS, CATEGORIES } from "../../utils/constants";

export default function TaskFilters() {
    const {
        activeFilter,
        activeCategory,
        applyFilter,
        applyCategory,
        searchQuery,
        updateSearch,
    } = useTaskStore();

    return (
        <div className="card mb-6">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Buscar tarea
                </label>
                <input
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    value={searchQuery}
                    onChange={(e) => updateSearch(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filtrar por estado
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => applyFilter(f.id)}
                                className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                                    activeFilter === f.id
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filtrar por categoría
                    </label>
                    <select
                        value={activeCategory}
                        onChange={(e) => applyCategory(e.target.value)}
                        className="input-field"
                    >
                        <option value="all">Todas las categorías</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
