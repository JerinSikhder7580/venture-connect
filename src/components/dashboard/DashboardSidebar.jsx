

import { auth } from "@/lib/auth";
import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, Rocket, } from "lucide-react";
import { label } from "motion/react-client";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    const role = user?.role?.toLowerCase() || "collaborator";

    // middleware / proxy private route
    //     My Startup
    // Add Opportunity
    // Manage Opportunities
    // Applications



    const dashboardItems = {
        admin: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/admin/overview' },
            { icon: ChartArea, label: "Manage Users", link: '/dashboard/admin/manage-users' },
            { icon: ChartArea, label: "Manage Startup", link: '/dashboard/admin/manage-startup' },
            { icon: ChartArea, label: " Transactions", link: '/dashboard/admin/view-transaction' },

        ],
        founder: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/founder/overview' },
            { icon: ChartArea, label: "My Startup", link: '/dashboard/founder/my-startup' },
            { icon: ChartArea, label: "Add opportunity", link: '/dashboard/founder/add-opportunity' },
            { icon: ChartArea, label: "Manage Opportunity", link: '/dashboard/founder/manage-opportunity' },
            { icon: ChartArea, label: "Application", link: '/dashboard/founder/application' },

        ],
        collaborator: [
            { icon: ChartArea, label: "Overview", link: '/dashboard/collaborator/overview' },
            { icon: ChartArea, label: "Browse Opportunities", link: '/dashboard/collaborator/browse-opportunities' },
            { icon: ChartArea, label: "My Applications", link: '/dashboard/collaborator/my-applications' },
            { icon: ChartArea, label: "Profile", link: '/dashboard/collaborator/profile' },

        ],


    }
    const navItems = dashboardItems[role]

   

    return (
        <div className="p-6 border" >

            <Drawer  >
                <Button className={'md:hidden sm:block'} variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <div className="flex items-center justify-center">

                    <Link href="/" className="flex items-center gap-2">

                        <div className="bg-cyan-400 p-1 rounded-lg ">
                            <Rocket size={22} className="text-white" />
                        </div>
                        <div className=" p-3">
                            <h1 className="text-2xl font-bold primary-text ">
                                Venture<span className="text-cyan-400">Connect</span>

                            </h1>
                        </div>

                    </Link>
                    {
                        user?.plan === "Premium" &&

                        <Image

                            src={'/icons8-crown-100.png'}
                            alt="icon"
                            height={20}
                            width={20}
                            className="object-cover"
                        />
                    }
                </div>



                <nav className="flex flex-col gap-1 w-55">
                    {navItems?.map((item) => (
                        <Link href={item.link}
                            key={item.label}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                            type="button"
                        >
                            <item.icon className="size-5 text-muted" />
                            {item.label}
                        </Link>
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