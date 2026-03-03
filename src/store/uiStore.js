import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    persist(
        (set) => ({
            colorScheme: 'light',
            sidebarOpen: true,

            switchScheme: () => set((state) => ({
                colorScheme: state.colorScheme === 'light' ? 'dark' : 'light'
            })),

            toggleSidebar: () => set((state) => ({
                sidebarOpen: !state.sidebarOpen
            })),

            setSidebarOpen: (open) => set({ sidebarOpen: open })
        }),
        {
            name: 'ui-preferences',
            partialize: (state) => ({
                colorScheme: state.colorScheme
            })
        }
    )
);
