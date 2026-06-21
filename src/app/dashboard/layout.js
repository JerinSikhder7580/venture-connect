import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { div } from "motion/react-client";

export default function DashboardLayout({ children }) {
    return (

        <div className="flex h-screen dark-bg">
            <div className="flex gap-3">

               <DashboardSidebar/>
                <div className=" ">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}