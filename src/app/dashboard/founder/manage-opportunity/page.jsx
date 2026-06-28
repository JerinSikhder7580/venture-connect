"use client"
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { success } from 'better-auth';
import { error } from 'better-auth/api';
import { aside } from 'motion/react-client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageOpportunity = () => {
    const { data: session } = authClient.useSession()
    const userEmail = session?.user?.email
    const [selectedOpportunity, setSelectedOpportunity] = useState(null)
    const workTypes = [
        "Remote",
        "On-site",
        "Hybrid",
        "Flexible",
        "Part-time Remote",
        "Full-time Remote",
        "Internship"
    ];
    const commitmentLevels = [
        "Full-time",
        "Part-time",
        "Freelance",
        "Contract",
        "Internship",
        "Volunteer",
        "Co-founder"
    ];

    const { data, refetch } = useQuery({
        queryKey: ["manage-opportunity"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/opportunity?userEmail=${userEmail}`)
            return result.data
        },
        enabled: userEmail ? true : false
    })
    console.log(data)


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    axios.delete(`http://localhost:8000/opportunity/${id}`),
                    {
                        loading: "Deleting",
                        success: () => {
                            refetch()
                            return "Delete Successfully"

                        },
                        error: "Something went wrong"
                    }
                )
            }
        });
    }
    const handleEdit = (e, id) => {
        e.preventDefault()
        setSelectedOpportunity()
        const formData = Object.fromEntries(new FormData(e.target).entries())


        toast.promise(async () => {
            const result = await axios.patch(`http://localhost:8000/opportunity?id=${id}`, formData)
            return result.data
        },
            {
                loading: "Updating Data",
                success: async () => {
                    await refetch()
                    return "Update Successfully"

                },
                error: "Update Failed"
            }
        )

    }

    return (
        <div className='space-y-6'>
            <Toaster />
            <div>
                <h1 className='text-3xl font-bold text-cyan-400'>Manage Opportunity</h1>
                <p className='mt-2 text-gray-400'>Update or remove your posted startup roles.</p>
            </div>

            <div className='space-y-4'>
                {
                    data?.length ? (
                        data.map((opportunity) => (
                            <div key={opportunity._id} className='w-full rounded-xl border border-cyan-400/30 bg-white/10 p-6 shadow-xl shadow-cyan-950/20'>
                                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                                    <div className='space-y-2'>
                                        <h2 className='text-2xl font-bold text-white'>{opportunity.title}</h2>
                                        <p className='break-all text-sm text-gray-400'>{opportunity.userEmail}</p>
                                    </div>

                                    <div className='flex gap-3'>
                                        <button
                                            type='button'
                                            onClick={() => setSelectedOpportunity(opportunity)}
                                            className='rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-black hover:bg-cyan-300'
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(opportunity._id)}
                                            type='button'
                                            className='rounded-lg bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-400'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className='mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
                                    <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                        <p className='text-sm text-gray-400'>Work Type</p>
                                        <h3 className='mt-1 font-semibold text-white'>{opportunity.workType}</h3>
                                    </div>

                                    <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                        <p className='text-sm text-gray-400'>Commitment Level</p>
                                        <h3 className='mt-1 font-semibold text-white'>{opportunity.commitmentLevel}</h3>
                                    </div>

                                    <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                        <p className='text-sm text-gray-400'>Application Deadline</p>
                                        <h3 className='mt-1 font-semibold text-white'>{opportunity.applicationDeadline}</h3>
                                    </div>

                                    <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                        <p className='text-sm text-gray-400'>Required Skills</p>
                                        <h3 className='mt-1 font-semibold text-white'>{opportunity.requireSkills}</h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='rounded-xl border border-cyan-400/30 bg-white/10 p-6 text-center'>
                            <h2 className='text-xl font-semibold text-white'>No opportunities found</h2>
                        </div>
                    )
                }
            </div>

            {
                selectedOpportunity && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
                        <div className='w-full max-w-2xl rounded-xl border border-cyan-400/30 bg-[#00142c] p-6 shadow-2xl shadow-black/40'>
                            <div className='mb-5 flex items-start justify-between gap-4'>
                                <div>
                                    <h2 className='text-2xl font-bold text-white'>Edit Opportunity</h2>
                                    <p className='mt-1 text-sm text-gray-400'>Update the selected role details.</p>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => setSelectedOpportunity(null)}
                                    className='rounded-full border border-white/20 px-3 py-1 text-white hover:bg-white/10'
                                >
                                    X
                                </button>
                            </div>

                            <form onSubmit={(e) => handleEdit(e, selectedOpportunity._id)} className='space-y-4'>
                                <div className='grid gap-4 md:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>Title</label>
                                        <input
                                            type='text'
                                            name='title'
                                            defaultValue={selectedOpportunity.title}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>User Email</label>
                                        <input
                                            type='email'
                                            name='userEmail'
                                            defaultValue={selectedOpportunity.userEmail}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>Work Type</label>
                                        <select
                                            name='workType'
                                            defaultValue={selectedOpportunity.workType}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        >
                                            {
                                                workTypes.map((workType) => (
                                                    <option key={workType} value={workType}>{workType}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>Commitment Level</label>
                                        <select
                                            name='commitmentLevel'
                                            defaultValue={selectedOpportunity.commitmentLevel}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        >
                                            {
                                                commitmentLevels.map((commitmentLevel) => (
                                                    <option key={commitmentLevel} value={commitmentLevel}>{commitmentLevel}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>Application Deadline</label>
                                        <input
                                            type='date'
                                            name='applicationDeadline'
                                            defaultValue={selectedOpportunity.applicationDeadline}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-gray-300'>Required Skills</label>
                                        <input
                                            type='text'
                                            name='requireSkills'
                                            defaultValue={selectedOpportunity.requireSkills}
                                            className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-end gap-3 pt-2'>
                                    <button
                                        type='button'
                                        onClick={() => setSelectedOpportunity(null)}
                                        className='rounded-lg border border-white/20 px-5 py-2 font-semibold text-white hover:bg-white/10'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-black hover:bg-cyan-300'
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ManageOpportunity;
