import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useUIStore } from "../../store/uiStore";

export default function Layout() {
    const { colorScheme } = useUIStore();
    const isDark = colorScheme === "dark";

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
            <Navbar />
            <main>
                <Toaster position="top-right" />
                <Outlet />
            </main>
        </div>
    );
}
