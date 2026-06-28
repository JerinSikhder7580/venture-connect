"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BriefcaseBusiness, CalendarDays, Code2, Rocket } from 'lucide-react';
import React from 'react';

const FeatureOpportunities = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["featured-opportunity"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/featured-opportunity`)
            return result.data

        }
    })

    return (
        <div className='dark-bg py-5'>
            <section className='px-5 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <div className='text-center'>
                        <p className='font-semibold text-[#00d3f2]'>Featured Roles</p>
                        <h1 className='mt-2 text-4xl font-bold text-white md:text-5xl'>
                            Featured Opportunities
                        </h1>
                        <p className='mx-auto mt-3 max-w-xl text-gray-400'>
                            Explore selected startup roles looking for talented collaborators.
                        </p>
                    </div>

                    <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                        {isLoading ? (
                            <div className='col-span-full rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center text-white'>
                                Loading featured opportunities...
                            </div>
                        ) : data?.length ? (
                            data.map((opportunity, index) => {
                                const skills = opportunity?.requireSkills
                                    ?.split(',')
                                    .map((skill) => skill.trim())
                                    .filter(Boolean);

                                return (
                                    <article
                                        key={opportunity?._id || index}
                                        className='group rounded-xl border border-cyan-400/20 bg-white/10 p-6 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50'
                                    >
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <p className='flex items-center gap-2 text-sm font-semibold text-cyan-300'>
                                                    <BriefcaseBusiness size={16} />
                                                    Role Title
                                                </p>
                                                <h2 className='mt-2 text-2xl font-bold text-white'>
                                                    {opportunity?.title || 'Untitled role'}
                                                </h2>
                                            </div>

                                            <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-[#00142c]'>
                                                <Rocket size={22} />
                                            </span>
                                        </div>

                                        <div className='mt-6 space-y-5'>
                                            <div>
                                                <p className='text-sm text-gray-400'>Startup Name</p>
                                                <p className='mt-1 text-lg font-semibold text-white'>
                                                    {opportunity?.startupName || 'Startup not provided'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className='flex items-center gap-2 text-sm text-gray-400'>
                                                    <Code2 size={16} className='text-cyan-300' />
                                                    Required Skills
                                                </p>
                                                <div className='mt-3 flex flex-wrap gap-2'>
                                                    {skills?.length ? (
                                                        skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className='rounded-full bg-cyan-300 px-3 py-1 text-xs font-semibold text-[#00142c]'
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className='text-sm text-gray-300'>Skills not provided</span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className='flex items-center gap-2 text-sm text-gray-300'>
                                                <CalendarDays size={17} className='text-[#ff7900]' />
                                                Application Deadline: {opportunity?.applicationDeadline || 'Not set'}
                                            </p>
                                        </div>
                                    </article>
                                )
                            })
                        ) : (
                            <div className='col-span-full rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center'>
                                <h2 className='text-xl font-semibold text-white'>No featured opportunities found</h2>
                                <p className='mt-2 text-gray-400'>Featured roles will appear here when available.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeatureOpportunities;
