"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const AdminOverview = () => {
    const { data: overview, isLoading, isError } = useQuery({
        queryKey: ["admin-overview"],
        queryFn: async () => {
            const result = await axios.get("http://localhost:8000/admin/dashboard");
            return result.data;
        }
    });
    if (isLoading) return <div className='flex justify-center p-8'><span className="loading loading-spinner text-success"></span></div>
    if (!overview) return


    // const overview = data || fallbackOverview;

    const stats = [
        {
            title: "Total Revenue",
            value: new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(Number(overview?.revenue) / 100 || 0),
            helper: "Revenue earned from completed payments",
        },
        {
            title: "Users",
            value: overview?.totalUsersCount || 0,
            helper: "Registered platform members",
        },
        {
            title: "Startups",
            value: overview?.totalStartupsCount || 0,
            helper: "Startup profiles on VentureConnect",
        },
        {
            title: "Opportunities",
            value: overview?.totalOpportunityCount || 0,
            helper: "Published collaboration opportunities",
        },
    ];
    console.log(isLoading)

    return (
        <div className='space-y-6 text-white'>
            <div>
                <h1 className='text-3xl font-semibold'>Admin Overview</h1>
                <p className='mt-1 text-sm text-gray-400'>Track platform growth, activity, and revenue at a glance.</p>
            </div>

            {/* {isLoading && } */}
            {/* {isError && <p className='text-sm text-amber-300'>Showing sample overview data because the dashboard API is unavailable.</p>} */}

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {
                    stats.map((stat) => (
                        <div key={stat.title} className='border border-white/10 bg-white/5 p-5'>
                            <p className='text-sm text-gray-400'>{stat.title}</p>
                            <h2 className='mt-3 text-4xl font-semibold'>{stat.value}</h2>
                            <p className='mt-3 text-sm text-gray-500'>{stat.helper}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AdminOverview;
