"use client"
import useUserEmail from '@/hooks/useUserEmail';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'better-auth/api';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const StartupDetailsPage = () => {
    const router = useRouter()
    const { id } = useParams()
    console.log(id)
    const userEmail = useUserEmail()

    // const { data: session } = authClient.useSession()
    // const userEmail = session?.user?.email
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [intentApplications, setIntentApplication] = useState()
    const handleApplySubmit = (e) => { // permission
        e.preventDefault()
        const formData = new FormData(e.target)
        // where the data coming from 
        formData.append('opportunityId', intentApplications._id)
        formData.append('opportunityTitle', intentApplications.title)
        formData.append("userEmail", userEmail)
        formData.append("startupName", intentApplications.startupName)
        formData.append("status", "pending")



        const applicationData = Object.fromEntries(formData)
        console.log(applicationData)

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
        setIsApplyModalOpen(false)
    }

    const handleModal = (opportunity, isModal) => {
        setIsApplyModalOpen(isModal)
        setIntentApplication(opportunity)

        console.log(opportunity)

    }


    const { data, isLoading, error } = useQuery({
        queryKey: [id, "startup"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/startup/${id}`)
            return result.data
        }
    })

    const { data: roles, isLoading: roleLoading } = useQuery({
        queryKey: [id, "role"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/opportunity?userEmail=${data.userEmail}`)
            return result.data
        },
        enabled: !isLoading && !error
    })
    console.log(roles)



    console.log(data)
    return (
        <div className='dark-bg min-h-screen py-10'>
            <Toaster />
            <section>
                {
                    isLoading ? (
                        <div className='flex min-h-[60vh] items-center justify-center'>
                            <span className="loading loading-spinner text-success"></span>
                        </div>
                    ) : (
                        <div className='space-y-6'>
                            <div className='w-full overflow-hidden rounded-xl border border-cyan-400/30 bg-white/10 shadow-2xl shadow-cyan-950/30  p-6  flex gap-2'>
                                {/* <img
                                src={data?.image}
                                alt={data?.name}
                                className='h-72 w-full object-cover'
                            /> */}
                                <div className='h-37.5 w-37.5'>


                                    <Image
                                        src={data?.image}
                                        alt='image'

                                        height={150}
                                        width={150}

                                        className='object-cover h-full w-full bg-center bg-no-repeat overflow-hidden  rounded-full'

                                    />
                                </div>
                                <div className='space-y-6  flex-1'>
                                    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                                        <div>
                                            <h1 className='text-3xl font-bold text-white md:text-4xl'>{data?.name}</h1>
                                            <p className='mt-2 text-gray-300'>{data?.description}</p>
                                        </div>

                                        <span className='w-fit rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold capitalize text-black'>
                                            {data?.status}
                                        </span>
                                    </div>

                                    <div className='grid gap-4 md:grid-cols-2'>
                                        <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                            <p className='text-sm text-gray-400'>Industry</p>
                                            <h2 className='mt-1 text-lg font-semibold text-white'>{data?.industry}</h2>
                                        </div>

                                        <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                            <p className='text-sm text-gray-400'>Funding Stage</p>
                                            <h2 className='mt-1 text-lg font-semibold text-white'>{data?.fundingStage}</h2>
                                        </div>

                                        <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                            <p className='text-sm text-gray-400'>Contact Email</p>
                                            <h2 className='mt-1 break-all text-lg font-semibold text-white'>{data?.email}</h2>
                                        </div>

                                        <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                            <p className='text-sm text-gray-400'>Founder Email</p>
                                            <h2 className='mt-1 break-all text-lg font-semibold text-white'>{data?.userEmail}</h2>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className='w-full rounded-xl border border-cyan-400/30 bg-white/10 p-6 shadow-2xl shadow-cyan-950/30'>
                                <div className='mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                                    <div>
                                        <h2 className='text-2xl font-bold text-white'>Startup Roles</h2>
                                        <p className='text-sm text-gray-400'>Available opportunities for this startup.</p>
                                    </div>
                                    <span className='w-fit rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 '>
                                        {roles?.length || 0} Roles
                                    </span>
                                </div>


                                {
                                    roleLoading ? (
                                        <span className="loading loading-spinner text-success"></span>
                                    ) : roles?.length ? (
                                        <div className='grid gap-4 lg:grid-cols-2'>
                                            {
                                                roles.map((role) => (
                                                    <div key={role._id} className='rounded-lg border border-white/10 bg-white/5 p-5'>
                                                        <div className='mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
                                                            <div>
                                                                <h3 className='text-xl font-bold text-white'>{role.title}</h3>
                                                                <p className='mt-1 break-all text-sm text-gray-400'>{role.userEmail}</p>
                                                            </div>
                                                            <span className='w-fit rounded-full bg-cyan-400 px-3 py-1 text-sm font-semibold text-black'>
                                                                {role.workType}
                                                            </span>
                                                        </div>

                                                        <div className='grid gap-3 md:grid-cols-2'>
                                                            <div>
                                                                <p className='text-sm text-gray-400'>Commitment Level</p>
                                                                <h4 className='mt-1 font-semibold text-white'>{role.commitmentLevel}</h4>
                                                            </div>
                                                            <div>
                                                                <p className='text-sm text-gray-400'>Application Deadline</p>
                                                                <h4 className='mt-1 font-semibold text-white'>{role.applicationDeadline}</h4>
                                                            </div>
                                                            <div className='md:col-span-2'>
                                                                <p className='text-sm text-gray-400'>Required Skills</p>
                                                                <h4 className='mt-1 text-white'>{role.requireSkills}</h4>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => handleModal(role, true)} className='btn w-full bg-cyan-400/60 border-none '> Apply now</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p className='text-gray-300'>No startup roles found.</p>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
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

            </section>

        </div>
    );
};

export default StartupDetailsPage;
