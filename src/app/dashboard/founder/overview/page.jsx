"use client"
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useUserEmail from '@/hooks/useUserEmail';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'lucide-react';
import React from 'react';

const FounderOverviewPage = () => {
    const userEmail = useUserEmail()

    const { data: startup, isLoading: startupLoading } = useQuery({
        queryKey: ["my-startup"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/startups?userEmail=${userEmail}`)
            return result.data?.[0]
        },
        enabled: userEmail ? true : false
    })


    const { data, isLoading } = useQuery({
        queryKey: ["admin-overview"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/founder/dashboard?email=${userEmail}&startupName=${startup.name}`)
            return result.data
        },
        enabled: !!userEmail && !!startup
    })
    if (startupLoading || isLoading) {
        return <div className="flex items-center justify-center p-8"><span className="loading loading-spinner text-success"></span></div>
    }
    if (!data) return


    return (
        <div class="min-h-screen dark-bg p-8">

            <div class="mb-10">


                <p class="mt-3 text-gray-400 text-lg">
                    Here&apos;s an overview of your startup activity.
                </p>
            </div>


            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">


                {/* <!-- Total Opportunities --> */}

                <div class="rounded-2xl border border-white/10 bg-[#141423] p-6 flex items-center gap-5 hover:border-[#00d3f2]/40 transition">

                    <div class="h-16 w-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                        <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-width="2" d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>

                    </div>


                    <div>
                        <h2 class="text-4xl font-bold text-white">
                            {data.opportunityCount}
                        </h2>

                        <p class="text-gray-400 mt-1">
                            Total Opportunities
                        </p>
                    </div>

                </div>





                {/* <!-- Total Applications --> */}

                <div class="rounded-2xl border border-white/10 bg-[#141423] p-6 flex items-center gap-5 hover:border-[#00d3f2]/40 transition">


                    <div class="h-16 w-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                        <User color='#40def5' />

                    </div>



                    <div>

                        <h2 class="text-4xl font-bold text-white">
                            {data.applicationCount}
                        </h2>

                        <p class="text-gray-400 mt-1">
                            Total Applications
                        </p>

                    </div>


                </div>





                {/* <!-- Accepted Members --> */}


                <div class="rounded-2xl border border-white/10 bg-[#141423] p-6 flex items-center gap-5 hover:border-[#00d3f2]/40 transition">


                    <div class="h-16 w-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">


                        <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                            <path stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />

                        </svg>


                    </div>



                    <div>

                        <h2 class="text-4xl font-bold text-white">
                            {data.acceptedApplication}
                        </h2>


                        <p class="text-gray-400 mt-1">
                            Accepted Members
                        </p>


                    </div>


                </div>


            </div>

        </div>
    );
};

export default FounderOverviewPage;
