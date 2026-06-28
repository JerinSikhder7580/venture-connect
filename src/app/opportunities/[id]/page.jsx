"use client"
import useUserEmail from '@/hooks/useUserEmail';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BriefcaseBusiness, CalendarDays, Code2, Mail, MapPin, Rocket, UserRound } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const OpportunityDetailsPage = () => {
    // const { data: session } = authClient.useSession()
    // const userEmail = session?.user?.email
    const userEmail = useUserEmail()
    const router = useRouter()
    const { id } = useParams()
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)


    const { data: application } = useQuery({
        queryKey: ["application"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/applications?userEmail=${userEmail}`)
            return result.data

        },
        enabled: userEmail ? true : false

    })

    const { data, isLoading } = useQuery({ // specific opportunity
        queryKey: ["opportunity-details", id],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/opportunity/${id}`)
            return result.data
        }
    })

    const skills = data?.requireSkills
        ?.split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);

    const handleApplications = () => {
        setIsApplyModalOpen(true)
        console.log('apply')

    }

    const handleApplySubmit = (e) => { // permission
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append('opportunityId', data._id)
        formData.append('opportunityTitle', data.title)
        formData.append("userEmail", userEmail)

        const applicationData = Object.fromEntries(formData)

        toast.promise(
            axios.post("http://localhost:8000/applications", applicationData),
            {
                loading: "Applying",
                success: () => {
                    router.push("/dashboard/collaborator/my-applications")
                    return "Applied successfully"
                },
                error: "Failed to Apply"
            }
        )


        // closing modal
        // setIsApplyModalOpen(false)
    }



    return (
        <div className='dark-bg min-h-screen py-12'>
            <section>
                {isLoading ? (
                    <div className='mx-auto max-w-4xl rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center text-white'>
                        Loading opportunity details...
                    </div>
                ) : data ? (
                    <article className='mx-auto max-w-4xl overflow-hidden rounded-xl border border-cyan-400/20 bg-white/10 shadow-2xl shadow-black/20'>
                        <div className='border-b border-white/10 p-6 md:p-8'>
                            <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
                                <div>
                                    <p className='flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300'>
                                        <Rocket size={16} />
                                        {data?.startupName || 'Startup opportunity'}
                                    </p>
                                    <h1 className='mt-3 text-3xl font-bold text-white md:text-5xl'>
                                        {data?.title || 'Untitled opportunity'}
                                    </h1>
                                    <p className='mt-3 break-all text-sm text-gray-400'>
                                        Posted by {data?.userEmail || 'Unknown founder'}
                                    </p>
                                </div>

                                <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-[#00142c]'>
                                    <BriefcaseBusiness size={28} />
                                </span>
                            </div>

                            <div className='mt-6 flex flex-wrap gap-2'>
                                <span className='rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#00142c]'>
                                    {data?.workType || 'Work type not set'}
                                </span>
                                <span className='rounded-full bg-[#ff7900] px-4 py-2 text-sm font-semibold text-white'>
                                    {data?.commitmentLevel || 'Commitment not set'}
                                </span>
                            </div>
                        </div>

                        <div className='grid gap-x-8 p-6 md:grid-cols-2 md:p-8'>
                            <div className='border-b border-white/10 py-5'>
                                <p className='flex items-center gap-2 text-sm font-medium text-gray-400'>
                                    <CalendarDays size={17} className='text-cyan-300' />
                                    Application Deadline
                                </p>
                                <h2 className='mt-2 text-xl font-bold text-white'>
                                    {data?.applicationDeadline || 'Not set'}
                                </h2>
                            </div>

                            <div className='border-b border-white/10 py-5'>
                                <p className='flex items-center gap-2 text-sm font-medium text-gray-400'>
                                    <MapPin size={17} className='text-cyan-300' />
                                    Work Type
                                </p>
                                <h2 className='mt-2 text-xl font-bold text-white'>
                                    {data?.workType || 'Not set'}
                                </h2>
                            </div>

                            <div className='border-b border-white/10 py-5'>
                                <p className='flex items-center gap-2 text-sm font-medium text-gray-400'>
                                    <UserRound size={17} className='text-cyan-300' />
                                    Commitment Level
                                </p>
                                <h2 className='mt-2 text-xl font-bold text-white'>
                                    {data?.commitmentLevel || 'Not set'}
                                </h2>
                            </div>

                            <div className='border-b border-white/10 py-5'>
                                <p className='flex items-center gap-2 text-sm font-medium text-gray-400'>
                                    <Mail size={17} className='text-cyan-300' />
                                    Founder Email
                                </p>
                                <h2 className='mt-2 break-all text-xl font-bold text-white'>
                                    {data?.userEmail || 'Not provided'}
                                </h2>
                            </div>

                            <div className='py-5 md:col-span-2'>
                                <p className='flex items-center gap-2 text-sm font-medium text-gray-400'>
                                    <Code2 size={17} className='text-cyan-300' />
                                    Required Skills
                                </p>
                                <div className='mt-3 flex flex-wrap gap-2'>
                                    {skills?.length ? (
                                        skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className='rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-cyan-200'
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className='text-gray-300'>Skills not provided</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 border-t border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8'>
                            <p className='break-all text-sm text-gray-400'>
                                Opportunity ID: {data?._id || id}
                            </p>
                            <button
                                type='button'
                                onClick={handleApplications}
                                className='btn border-none bg-cyan-400 px-8 text-[#00142c] shadow-none hover:bg-cyan-300'
                            >
                                Apply Now
                            </button>
                        </div>
                    </article>
                ) : (
                    <div className='mx-auto max-w-4xl rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center'>
                        <h1 className='text-2xl font-bold text-white'>Opportunity not found</h1>
                        <p className='mt-2 text-gray-400'>Please go back and choose another opportunity.</p>
                    </div>
                )}
            </section>

            <div className={` backdrop-blur-md  modal ${isApplyModalOpen ? 'modal-open' : ''}`}>
                <div className='modal-box max-w-2xl dark-bg text-white hover:shadow-sm hover:shadow-blue-500/50 transition duration-300  '>
                    <h2 className='text-2xl font-bold'>Apply for this opportunity</h2>
                    <p className='mt-2 text-sm text-gray-500'>
                        {data?.title || 'Opportunity'} at {data?.startupName || 'this startup'}
                    </p>

                    <form onSubmit={handleApplySubmit} className='mt-6 space-y-4'>
                        <div>
                            <label className='text-sm font-semibold'>Applicant Email</label>
                            <input
                                type='email'
                                name='applicantEmail'
                                placeholder='you@example.com'
                                required
                                className='input mt-2 w-full border-gray-200 bg-white/10'
                            />
                        </div>

                        <div>
                            <label className='text-sm font-semibold'>Portfolio Link</label>
                            <input
                                type='url'
                                name='portfolioLink'
                                placeholder='https://your-portfolio.com'
                                required
                                className='input mt-2 w-full border-gray-200 bg-white/10'
                            />
                        </div>

                        <div>
                            <label className='text-sm font-semibold'>Motivation Message</label>
                            <textarea
                                name='motivationMessage'
                                placeholder='Write a short message about why you want to join...'
                                required
                                rows={5}
                                className='textarea mt-2 w-full resize-none border-gray-200 bg-white/10'
                            />
                        </div>

                        <div className='modal-action'>
                            <button
                                type='button'
                                onClick={() => setIsApplyModalOpen(false)}
                                className='btn border-gray-200 bg-white text-[#00142c] shadow-none'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='btn border-none bg-cyan-400 text-[#00142c] shadow-none hover:bg-cyan-300'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    type='button'
                    aria-label='Close application modal'
                    onClick={() => setIsApplyModalOpen(false)}
                    className='modal-backdrop'
                >
                    close
                </button>
            </div>
        </div>
    );
};

export default OpportunityDetailsPage;
