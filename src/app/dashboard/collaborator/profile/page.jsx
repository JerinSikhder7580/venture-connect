"use client"

import useUserEmail from '@/hooks/useUserEmail';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CollaboratorProfilePage = () => {
    const userEmail = useUserEmail()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my-profile", userEmail],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/user?email=${userEmail}`)
            return result.data
        },
        enabled: userEmail ? true : false
    })
    console.log(data)

    const hasSkill = Boolean(data?.skill?.trim())
    const hasBio = Boolean(data?.bio?.trim())
    const joinedDate = data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "Not available"
    const updatedDate = data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "Not available"

    const handleEdit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target).entries())
        formData.updatedAt = new Date()
        formData.image = imageUrl 


        toast.promise(
            axios.patch(`http://localhost:8000/user?email=${userEmail}`, formData),
            {
                loading: "Updating profile",
                success: async () => {
                    await refetch()
                    setIsModalOpen(false)
                    return "Profile updated successfully"
                },
                error: "Failed to update profile"
            }
        )
        console.log(formData)
    }




    const handleModalImage = async (e) => {
        const imageFile = e.target.files[0]

        const formData = new FormData()
        formData.append("image", imageFile)
        // const image = formData.get("image") 

        const imgData = await axios.post(`https://api.imgbb.com/1/upload?key=46cef828a7aeed48196e6dc399220d34`, formData)

        setImageUrl(imgData.data.data.url)





        console.log(imgData.data.data.url)
    }

    return (
        <div className='min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8'>
            <Toaster />
            <div className='mx-auto max-w-4xl'>
                <div className='mb-8'>
                    <p className='text-sm font-medium uppercase tracking-wide text-cyan-300'>Collaborator Profile</p>
                    <h1 className='mt-2 text-3xl font-bold text-white'>Your profile</h1>
                    <p className='mt-2 max-w-2xl text-sm text-gray-300'>
                        Keep your public collaborator details polished for founders and startup teams.
                    </p>
                </div>

                {isLoading ? (
                    <div className='rounded-xl border border-white/10 bg-white/5 p-6 text-gray-300'>
                        <span className="loading loading-spinner text-success"></span>
                    </div>
                ) : (
                    <div className='rounded-xl border border-cyan-400/30 bg-white/10 p-6 shadow-xl shadow-cyan-950/20'>
                        <div className='flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between'>
                            <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
                                <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-cyan-300/40 bg-cyan-300/10'>
                                    {data?.image ? (
                                        <Image
                                            src={data?.image}
                                            alt={data?.name || "Collaborator profile"}
                                            fill
                                            className='object-cover'
                                        />
                                    ) : (
                                        <div className='flex h-full w-full items-center justify-center text-3xl font-bold text-cyan-200'>
                                            {data?.name?.charAt(0) || "C"}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className='text-2xl font-bold text-white'>{data?.name || "Collaborator"}</h2>
                                    <p className='mt-1 break-all text-sm text-gray-300'>{data?.email}</p>
                                    <div className='mt-3 flex flex-wrap gap-2'>
                                        <span className='rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase text-cyan-200'>
                                            {data?.role || "collaborator"}
                                        </span>
                                        <span className='rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-gray-200'>
                                            {data?.plan || "free"} plan
                                        </span>
                                        <span className='rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase text-emerald-200'>
                                            {data?.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type='button'
                                onClick={() => setIsModalOpen(true)}
                                className='rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300'
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className='mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
                            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                <p className='text-sm text-gray-400'>Opportunity</p>
                                <h3 className='mt-1 font-semibold text-white'>{data?.opportunity ?? 0}</h3>
                            </div>
                            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                <p className='text-sm text-gray-400'>Email Verified</p>
                                <h3 className='mt-1 font-semibold text-white'>{data?.emailVerified ? "Yes" : "No"}</h3>
                            </div>
                            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                <p className='text-sm text-gray-400'>Created</p>
                                <h3 className='mt-1 font-semibold text-white'>{joinedDate}</h3>
                            </div>
                            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                                <p className='text-sm text-gray-400'>Updated</p>
                                <h3 className='mt-1 font-semibold text-white'>{updatedDate}</h3>
                            </div>
                        </div>

                        <div className='mt-6 grid gap-4 md:grid-cols-2'>
                            <div className='rounded-lg border border-white/10 bg-white/5 p-5'>
                                <div className='flex items-center justify-between gap-3'>
                                    <p className='text-sm text-gray-400'>Skill</p>
                                    {!hasSkill && (
                                        <button
                                            type='button'
                                            onClick={() => setIsModalOpen(true)}
                                            className='rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black hover:bg-cyan-300'
                                        >
                                            Add Skill
                                        </button>
                                    )}
                                </div>
                                <h3 className='mt-2 text-lg font-semibold text-white'>
                                    {hasSkill ? data.skill : "No skill added yet"}
                                </h3>
                            </div>

                            <div className='rounded-lg border border-white/10 bg-white/5 p-5'>
                                <div className='flex items-center justify-between gap-3'>
                                    <p className='text-sm text-gray-400'>Bio</p>
                                    {!hasBio && (
                                        <button
                                            type='button'
                                            onClick={() => setIsModalOpen(true)}
                                            className='rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black hover:bg-cyan-300'
                                        >
                                            Add Bio
                                        </button>
                                    )}
                                </div>
                                <p className='mt-2 text-gray-200'>
                                    {hasBio ? data.bio : "No bio added yet"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
                    <div className='w-full max-w-2xl rounded-xl border border-cyan-400/30 bg-[#00142c] p-6 shadow-2xl shadow-black/40'>
                        <div className='mb-5 flex items-start justify-between gap-4'>
                            <div>
                                <h2 className='text-2xl font-bold text-white'>Edit Profile</h2>
                                <p className='mt-1 text-sm text-gray-400'>Add your skill, bio, and public profile details.</p>
                            </div>
                            <button
                                type='button'
                                onClick={() => setIsModalOpen(false)}
                                className='rounded-full border border-white/20 px-3 py-1 text-white hover:bg-white/10'
                            >
                                X
                            </button>
                        </div>

                        <form onSubmit={handleEdit} className='space-y-4'>
                            <div className='grid gap-4 md:grid-cols-2'>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-300'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        defaultValue={data?.name}
                                        className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-gray-300'>Image URL</label>
                                    <input onChange={handleModalImage}
                                        type='file'
                                        name='image'
                                        // defaultValue={data?.image}
                                        className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                    />
                                </div>

                                <div className='space-y-2 md:col-span-2'>
                                    <label className='text-sm font-medium text-gray-300'>Skill</label>
                                    <input
                                        type='text'
                                        name='skill'
                                        defaultValue={data?.skill}
                                        placeholder='Product Design, React, Marketing, Finance'
                                        className='w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                    />
                                </div>

                                <div className='space-y-2 md:col-span-2'>
                                    <label className='text-sm font-medium text-gray-300'>Bio</label>
                                    <textarea
                                        name='bio'
                                        rows='5'
                                        defaultValue={data?.bio}
                                        placeholder='Write a short bio about your experience and what kind of startup work you want to join.'
                                        className='w-full resize-none rounded-lg border border-white/10 bg-white px-4 py-3 text-black outline-none focus:border-cyan-400'
                                    ></textarea>
                                </div>
                            </div>

                            <div className='flex justify-end gap-3 pt-2'>
                                <button
                                    type='button'
                                    onClick={() => setIsModalOpen(false)}
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
            )}
        </div>
    );
};

export default CollaboratorProfilePage;
