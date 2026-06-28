import React from 'react';

const MyApplicationsPage = () => {
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
                                <tr className='transition hover:bg-white/5'>
                                    <td className='px-6 py-5 text-sm font-medium text-white'>Frontend Developer</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>NovaTech Labs</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>June 18, 2026</td>
                                    <td className='px-6 py-5'>
                                        <span className='rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-200'>
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                                <tr className='transition hover:bg-white/5'>
                                    <td className='px-6 py-5 text-sm font-medium text-white'>UI/UX Designer</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>BrightSeed</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>June 12, 2026</td>
                                    <td className='px-6 py-5'>
                                        <span className='rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200'>
                                            Accepted
                                        </span>
                                    </td>
                                </tr>
                                <tr className='transition hover:bg-white/5'>
                                    <td className='px-6 py-5 text-sm font-medium text-white'>Marketing Strategist</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>LaunchWave</td>
                                    <td className='px-6 py-5 text-sm text-gray-300'>June 04, 2026</td>
                                    <td className='px-6 py-5'>
                                        <span className='rounded-full bg-rose-400/15 px-3 py-1 text-xs font-semibold text-rose-200'>
                                            Rejected
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyApplicationsPage;
