"use client"
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const StartupDetailsPage = () => {
    const { id } = useParams()
    console.log(id)

    // const { data: session } = authClient.useSession()
    // const userEmail = session?.user?.email


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
            <section>
                {
                    isLoading ? (
                        <div className='flex min-h-[60vh] items-center justify-center'>
                            <h1 className='text-xl font-semibold text-white'>Loading startup details...</h1>
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
                                    <span className='w-fit rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300'>
                                        {roles?.length || 0} Roles
                                    </span>
                                </div>

                                {
                                    roleLoading ? (
                                        <p className='text-gray-300'>Loading roles...</p>
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
            </section>

        </div>
    );
};

export default StartupDetailsPage;
