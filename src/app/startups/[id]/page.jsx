"use client"
import useUserEmail from '@/hooks/useUserEmail';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const StartupDetailsPage = () => {
    const router = useRouter()
    const { id } = useParams()
    const userEmail = useUserEmail()

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [intentApplications, setIntentApplication] = useState()

    const handleApplySubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        formData.append('opportunityId', intentApplications._id)
        formData.append('opportunityTitle', intentApplications.title)
        formData.append("userEmail", userEmail)
        formData.append("startupName", intentApplications.startupName)
        formData.append("status", "pending")

        const applicationData = Object.fromEntries(formData)

        toast.promise(
            axios.post("https://venture-connect-server-kappa.vercel.app/applications", applicationData),
            {
                loading: "Applying",
                success: () => {
                    router.push("/dashboard/collaborator/my-applications")
                    return "Applied successfully"
                },
                error: "Failed to Apply"
            }
        )

        setIsApplyModalOpen(false)
    }


    const handleModal = (opportunity, isModal) => {
        setIsApplyModalOpen(isModal)
        setIntentApplication(opportunity)
    }


    const { data, isLoading, error } = useQuery({
        queryKey: [id, "startup"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/startup/${id}`)
            return result.data
        }
    })


    const { data: roles, isLoading: roleLoading } = useQuery({
        queryKey: [id, "role"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/opportunity?userEmail=${data.userEmail}`)
            return result.data
        },
        enabled: !isLoading && !error
    })


    return (
        <div className='dark-bg min-h-screen py-6 sm:py-10 px-3 sm:px-6'>

            <Toaster />

            <section>

                {
                    isLoading ? (

                        <div className='flex min-h-[60vh] items-center justify-center'>
                            <span className="loading loading-spinner text-success"></span>
                        </div>

                    ) : (

                        <div className='space-y-6'>


                            {/* Startup Header */}

                            <div className='w-full overflow-hidden rounded-xl border border-cyan-400/30 bg-white/10 shadow-2xl shadow-cyan-950/30 p-4 sm:p-6 flex flex-col sm:flex-row gap-5'>


                                <div className='h-28 w-28 sm:h-37.5 sm:w-37.5 shrink-0 mx-auto sm:mx-0'>

                                    <Image
                                        src={data?.image}
                                        alt='image'
                                        height={150}
                                        width={150}
                                        className='object-cover h-full w-full rounded-full'
                                    />

                                </div>



                                <div className='space-y-5 sm:space-y-6 flex-1 min-w-0'>


                                    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>


                                        <div>

                                            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words'>
                                                {data?.name}
                                            </h1>


                                            <p className='mt-2 text-sm sm:text-base text-gray-300 break-words'>
                                                {data?.description}
                                            </p>


                                        </div>


                                        <span className='w-fit rounded-full bg-cyan-400 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold capitalize text-black'>
                                            {data?.status}
                                        </span>


                                    </div>



                                    <div className='grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2'>


                                        <div className='rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4 overflow-hidden'>

                                            <p className='text-sm text-gray-400'>
                                                Industry
                                            </p>

                                            <h2 className='mt-1 text-lg font-semibold text-white'>
                                                {data?.industry}
                                            </h2>

                                        </div>



                                        <div className='rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4 overflow-hidden'>

                                            <p className='text-sm text-gray-400'>
                                                Funding Stage
                                            </p>

                                            <h2 className='mt-1 text-lg font-semibold text-white'>
                                                {data?.fundingStage}
                                            </h2>

                                        </div>



                                        <div className='rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4 overflow-hidden'>

                                            <p className='text-sm text-gray-400'>
                                                Contact Email
                                            </p>

                                            <h2 className='mt-1 break-all text-lg font-semibold text-white'>
                                                {data?.email}
                                            </h2>

                                        </div>



                                        <div className='rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4 overflow-hidden'>

                                            <p className='text-sm text-gray-400'>
                                                Founder Email
                                            </p>

                                            <h2 className='mt-1 break-all text-lg font-semibold text-white'>
                                                {data?.userEmail}
                                            </h2>

                                        </div>


                                    </div>


                                </div>


                            </div>





                            {/* Roles */}

                            <div className='w-full rounded-xl border border-cyan-400/30 bg-white/10 p-4 sm:p-6 shadow-2xl shadow-cyan-950/30'>


                                <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>


                                    <div>

                                        <h2 className='text-2xl font-bold text-white'>
                                            Startup Roles
                                        </h2>


                                        <p className='text-sm text-gray-400'>
                                            Available opportunities for this startup.
                                        </p>


                                    </div>



                                    <span className='w-fit rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300'>
                                        {roles?.length || 0} Roles
                                    </span>


                                </div>





                                {
                                    roleLoading ? (

                                        <span className="loading loading-spinner text-success"></span>

                                    ) : roles?.length ? (


                                        <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>


                                            {
                                                roles.map((role) => (


                                                    <div
                                                        key={role._id}
                                                        className='rounded-lg border border-white/10 bg-white/5 p-5'
                                                    >



                                                        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>


                                                            <div>

                                                                <h3 className='text-xl font-bold text-white'>
                                                                    {role.title}
                                                                </h3>


                                                                <p className='mt-1 break-all text-sm text-gray-400'>
                                                                    {role.userEmail}
                                                                </p>


                                                            </div>



                                                            <span className='w-fit rounded-full bg-cyan-400 px-3 py-1 text-sm font-semibold text-black'>
                                                                {role.workType}
                                                            </span>


                                                        </div>





                                                        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>


                                                            <div>

                                                                <p className='text-sm text-gray-400'>
                                                                    Commitment Level
                                                                </p>

                                                                <h4 className='mt-1 font-semibold text-white'>
                                                                    {role.commitmentLevel}
                                                                </h4>

                                                            </div>



                                                            <div>

                                                                <p className='text-sm text-gray-400'>
                                                                    Application Deadline
                                                                </p>

                                                                <h4 className='mt-1 font-semibold text-white'>
                                                                    {role.applicationDeadline}
                                                                </h4>

                                                            </div>



                                                            <div className='sm:col-span-2'>

                                                                <p className='text-sm text-gray-400'>
                                                                    Required Skills
                                                                </p>

                                                                <h4 className='mt-1 text-white'>
                                                                    {role.requireSkills}
                                                                </h4>

                                                            </div>


                                                        </div>




                                                        <button
                                                            onClick={() => handleModal(role, true)}
                                                            className='btn w-full mt-4 bg-cyan-400/60 border-none'
                                                        >
                                                            Apply now
                                                        </button>



                                                    </div>


                                                ))
                                            }


                                        </div>


                                    ) : (

                                        <p className='text-gray-300'>
                                            No startup roles found.
                                        </p>

                                    )
                                }


                            </div>



                        </div>


                    )
                }





                {/* Modal */}


                <div className={`backdrop-blur-md modal ${isApplyModalOpen ? 'modal-open' : ''}`}>


                    <div className='modal-box w-[95%] sm:w-full max-w-2xl dark-bg text-white'>


                        <h2 className='text-2xl font-bold'>
                            Apply for this opportunity
                        </h2>


                        <p className='mt-2 text-sm text-gray-500'>
                            {data?.title || 'Opportunity'} at {data?.startupName || 'this startup'}
                        </p>



                        <form
                            onSubmit={handleApplySubmit}
                            className='mt-6 space-y-4'
                        >


                            <input
                                type='email'
                                name='applicantEmail'
                                placeholder='you@example.com'
                                required
                                className='input mt-2 w-full border-gray-200 bg-white/10'
                            />



                            <input
                                type='url'
                                name='portfolioLink'
                                placeholder='https://your-portfolio.com'
                                required
                                className='input mt-2 w-full border-gray-200 bg-white/10'
                            />



                            <textarea
                                name='motivationMessage'
                                placeholder='Write a short message about why you want to join...'
                                required
                                rows={5}
                                className='textarea mt-2 w-full resize-none border-gray-200 bg-white/10'
                            />



                            <div className='modal-action flex-col sm:flex-row gap-3'>


                                <button
                                    type='button'
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className='btn w-full sm:w-auto bg-white text-[#00142c]'
                                >
                                    Cancel
                                </button>



                                <button
                                    type='submit'
                                    className='btn w-full sm:w-auto bg-cyan-400 text-[#00142c]'
                                >
                                    Submit
                                </button>


                            </div>



                        </form>


                    </div>




                    <button
                        type='button'
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