import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { div } from "motion/react-client";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
    return (

        <div className="flex min-h-screen dark-bg">
            <Toaster />

            <div className="flex gap-3 w-full">

                <DashboardSidebar />
                <div className="flex-1">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}