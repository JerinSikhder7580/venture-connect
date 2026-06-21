

import { auth } from "@/lib/auth";
import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, } from "lucide-react";
import { label } from "motion/react-client";
import { headers } from "next/headers";

export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    const role = user?.role?.toLowerCase() || "collaborator";
    console.log(user)


    const dashboardItems = {
        admin: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/admin' },
            { icon: ChartArea, label: "Manage Users", link: '/dashboard/admin/manage-users' },
            { icon: ChartArea, label: "Manage Startup Posts", link: '/dashboard/admin/manage-startup-post' },
            { icon: ChartArea, label: "View Transactions", link: '/dashboard/admin/view-transaction' },
            { icon: ChartArea, label: "Moderate Platform Activities", link: '/dashboard/admin/moderate-platform-activities' },

        ],
        founder: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/founder' },
            { icon: ChartArea, label: "Create Startup Profile", link: '/dashboard/founder/create-startup-profile' },
            { icon: ChartArea, label: "Post Team Requirements", link: '/dashboard/founder/post-team-requirements' },
            { icon: ChartArea, label: "Review Applications", link: '/dashboard/founder/review-application' },
            { icon: ChartArea, label: "Manage Applicants", link:'/dashboard/founder/manage-applicants' },

        ],
        collaborator: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/collaborator' },
            { icon: ChartArea, label: "Browse Startups", link: '/dashboard/collaborator/browse-startups' },
            { icon: ChartArea, label: "Apply to Join Teams", link: '/dashboard/collaborator/apply-to-join-teams' },
            { icon: ChartArea, label: "Track Application Status", link: '/dashboard/collaborator/track-application-status' },
            { icon: ChartArea, label: "Maintain Personal Profile", link: '/dashboard/collaborator/maintain-personal-profile' },

        ],


    }
    const navItems = dashboardItems[role]
    console.log(navItems)

    // const navItems = [
    //     { icon: House, label: "Home" },
    //     { icon: Magnifier, label: "Search" },
    //     { icon: Bell, label: "Notifications" },
    //     { icon: Envelope, label: "Messages" },
    //     { icon: Person, label: "Profile" },
    //     { icon: Gear, label: "Settings" },
    // ];

    return (
        <div className="p-6 border" >

            <Drawer  >
                <Button className={'md:hidden sm:block'} variant="secondary">
                    <Bars />
                    Menu
                </Button>

                <nav className="flex flex-col gap-1 w-55">
                    {navItems?.map((item) => (
                        <button
                            key={item.label}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                            type="button"
                        >
                            <item.icon className="size-5 text-muted" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                <nav className="flex flex-col gap-1">
                                    {navItems?.map((item) => (
                                        <button
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                            type="button"
                                        >
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </div>
    );
}