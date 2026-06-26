import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { div } from "motion/react-client";

export default function DashboardLayout({ children }) {
    return (

        <div className="flex h-screen dark-bg">
            <div className="flex gap-3 w-full">

               <DashboardSidebar/>
                <div className="flex-1">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}