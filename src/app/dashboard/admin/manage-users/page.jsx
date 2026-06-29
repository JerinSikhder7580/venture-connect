'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// const sampleUsers = [
//     {
//         _id: "6a36c2f614242a1b2d9980d4",
//         name: "Colby Duran",
//         email: "qoxu@mailinator.com",
//         emailVerified: false,
//         image: "https://i.ibb.co/FqVZ2qZN/banner.jpg",
//         isBlocked: false,
//         opportunity: 3,
//         plan: "free",
//         role: "founder",
//         createdAt: "2026-06-20T16:42:30.337Z",
//         updatedAt: "2026-06-20T16:42:30.337Z",
//     },
// ];

const ManageUsers = () => {
    // const [blockedUsers, setBlockedUsers] = useState({});

    const { data: users, isLoading, isError, refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const result = await axios.get("http://localhost:8000/users");

            return result.data;
        }
    });
    if (isLoading) {
        return <div className='flex justify-center p-8'><span className="loading loading-spinner text-success"></span></div>
    }
    if (!users) return
    const blockedUsers = { ...users.filter((user) => user.isBlocked === true) } || {} // filter returns an array
    // const blockedUsers = ...blockedUsersInArray

    // const users? = useMemo(() => {
    //     if (Array.isArray(users?) && users?.length) {
    //         return users?;
    //     }

    //     if (users? && !Array.isArray(users?)) {
    //         return [users?];
    //     }

    //     return sampleUsers;
    // }, [users?]);

    const handleBlockToggle = (id, currentStatus) => {
        toast.promise(
            axios.patch(`http://localhost:8000/user?id=${id}&status=${!currentStatus}`),
            {
                loading: currentStatus ? "Unblocking" : "Blocking",
                success: async () => {
                    await refetch()
                    return currentStatus ? "Unblocked" : "Blocked"
                },
                error: "Failed"
            }
        )

    };



    return (
        <div className='space-y-6 text-white'>
            <Toaster />
            <div>
                <h1 className='text-3xl font-semibold'>Manage users?</h1>
                <p className='mt-1 text-sm text-gray-400'>View platform users? and block access from the admin panel.</p>
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Total users?</p>
                    <h2 className='mt-2 text-3xl font-semibold'>{users?.length}</h2>
                </div>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Blocked</p>
                    <h2 className='mt-2 text-3xl font-semibold'>
                        {users?.filter((user) => blockedUsers[user?._id] ?? user?.isBlocked).length}
                    </h2>
                </div>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Founders</p>
                    <h2 className='mt-2 text-3xl font-semibold'>
                        {users?.filter((user) => user?.role === "founder").length}
                    </h2>
                </div>
            </div>

            {isError && <p className='text-sm text-amber-300'>Showing sample user data because the users? API is unavailable.</p>}

            <div className='overflow-x-auto border border-white/10'>
                <table className='table'>
                    <thead>
                        <tr className='border-white/10 text-gray-300'>
                            <th>User</th>
                            <th>Role</th>
                            <th>Plan</th>
                            <th>Opportunity</th>
                            <th>Email Status</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th className='text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user) => {
                                const isBlocked = blockedUsers[user?._id] ?? user?.isBlocked;

                                return (
                                    <tr key={user?._id || user?.email} className='border-white/10'>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <Image
                                                    src={user?.image || "/banner.png"}
                                                    width={52}
                                                    height={52}
                                                    alt={`${user?.name || "User"} profile image`}
                                                    className='h-[52px] w-[52px] rounded-full object-cover'
                                                />
                                                <div>
                                                    <h3 className='font-semibold'>{user?.name || "Unknown User"}</h3>
                                                    <p className='text-sm text-gray-400'>{user?.email || "No email"}</p>
                                                    <p className='text-xs text-gray-500'>ID: {user?._id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='badge badge-outline capitalize text-gray-200'>{user?.role || "user"}</span>
                                        </td>
                                        <td className='capitalize'>{user?.plan || "free"}</td>
                                        <td>{user?.opportunity ?? 0}</td>
                                        <td>
                                            <span className={`badge ${user?.emailVerified ? "badge-success" : "badge-warning"}`}>
                                                {user?.emailVerified ? "Verified" : "Not Verified"}
                                            </span>
                                        </td>
                                        <td>{format(user?.createdAt, "PP")}</td>
                                        <td>
                                            <span className={`badge ${isBlocked ? "badge-error" : "badge-success"}`}>
                                                {isBlocked ? "Blocked" : "Active"}
                                            </span>
                                        </td>
                                        <td className='text-right'>
                                            <button
                                                onClick={() => handleBlockToggle(user?._id, isBlocked)}
                                                className={`btn btn-sm border-none ${isBlocked ? "bg-green-300 text-black" : "bg-red-300 text-black"}`}
                                            >
                                                {isBlocked ? "Unblock" : "Block"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
