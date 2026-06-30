"use client"
import useUserEmail from "@/hooks/useUserEmail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {  format } from "date-fns";

const MyApplicationsPage = () => {

    const userEmail = useUserEmail()

    const { data: applications, isLoading } = useQuery({
        queryKey: ["my-application"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/applications?userEmail=${userEmail}`)
            console.log(result.data)
            return result.data
        },
        enabled: userEmail ? true : false
    })
    // variable === variable true
    // variable === obj ar key false


    



    return (
        <div className='min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <div className='mb-8'>
                    <p className='text-sm font-medium uppercase tracking-wide text-cyan-300'>My Applications</p>
                    <h1 className='mt-2 text-3xl font-bold text-white'>Application history</h1>
                    <p className='mt-2 text-sm text-gray-300'>
                        Track the opportunities you applied for and their current status.
                    </p>
                </div>

                <div className='overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur'>
                    <div className='overflow-x-auto'>
                        <table className='w-full min-w-180 text-left'>
                            <thead className='border-b border-white/10 bg-slate-950/60'>
                                <tr>
                                    <th className='px-6 py-4 text-sm font-semibold text-gray-200'>Opportunity Name</th>
                                    <th className='px-6 py-4 text-sm font-semibold text-gray-200'>Startup Name</th>
                                    <th className='px-6 py-4 text-sm font-semibold text-gray-200'>Applied Date</th>
                                    <th className='px-6 py-4 text-sm font-semibold text-gray-200'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-white/10'>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className='px-6 py-8 text-center'>
                                            <span className="loading loading-spinner text-success"></span>
                                        </td>
                                    </tr>
                                ) : applications?.map((application) => (
                                    <tr
                                        key={`${application.opportunityTitle}-${application.appliedAt}`}
                                        className='transition hover:bg-white/5'
                                    >
                                        <td className='px-6 py-5 text-sm font-medium text-white'>
                                            {application.opportunityTitle}
                                        </td>
                                        <td className='px-6 py-5 text-sm text-gray-300'>
                                            {application.startupName}
                                        </td>
                                        <td className='px-6 py-5 text-sm text-gray-300'>
                                            {/* {formatDate(application.appliedAt.$date)} */}
                                            {format(application.appliedAt, 'PP')}
                                        </td>
                                        <td className='px-6 py-5'>
                                            <span className='rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold capitalize text-amber-200'>
                                                {application.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyApplicationsPage;
