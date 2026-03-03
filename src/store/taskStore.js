import { create } from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,
    error: null,

    activeFilter: "all",
    activeCategory: "all",
    searchQuery: "",

    replaceTasks: (items) => set({ tasks: items, loading: false, error: null }),

    appendTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task],
        })),

    patchTask: (id, changes) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, ...changes } : t,
            ),
        })),

    removeTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
        })),

    applyFilter: (filter) => set({ activeFilter: filter }),

    applyCategory: (category) => set({ activeCategory: category }),

    updateSearch: (query) => set({ searchQuery: query }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error, loading: false }),
}));
