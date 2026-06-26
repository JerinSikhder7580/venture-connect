"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { success } from 'better-auth';
import { error } from 'better-auth/api';
import { div, h1 } from 'motion/react-client';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const ManageStartupPost = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["pending-startups"],
        queryFn: async () => {
            console.log("working");
            const result = await axios.get("http://localhost:8000/startups?status=pending")
            // console.log(result)
            return result.data

        }
    })
    // http method: patch
    // api name: startup
    const handleStatus = (id, status) => {
        toast.promise(
            axios.patch(`http://localhost:8000/startup/${id}`, { status }),
            {
                loading: `${status}ing`,
                success: () => {
                    refetch()
                    return `${status}ed`
                },
                error: "Failed"
            }


        )

    }
    console.log(data, isLoading)
    return (
        <div>
            <Toaster />
            <h1 className='text-white text-3xl '>ManageStartupPost</h1>
            <p className='text-md text-gray-500 mb-2'>Manage startup post here!</p>
            {!data?.[0] && !isLoading && <h1 className='text-white'>No Data Found</h1>}
            <div>

                {
                    data?.map((startup, index) =>
                        <div key={index} className='flex justify-between p-5 border items-center'>
                            <div className='space-y-2' >

                                <Image
                                    src={startup?.image}
                                    width={100}
                                    height={100}
                                    alt='image'
                                    className='object-cover'


                                />

                                <h1 className='text-white text-2xl '>{startup?.name}</h1>
                                <div className='flex gap-3 '>
                                    <p className='text-white border rounded-md p-2'>{startup?.industry}</p>
                                    <p className='text-white border rounded-md p-2'>{startup?.fundingStage}</p>
                                </div>
                                <p className='text-gray-500 text-sm'>{startup?.description}</p>


                            </div>
                            <div className='flex gap-3'>
                                <button onClick={() => handleStatus(startup._id, "accept")} className=' btn bg-green-300 border-none'>Accepted</button>
                                <button onClick={() => handleStatus(startup._id, "reject")} className=' btn bg-red-300 border-none'>Rejected</button>
                            </div>
                        </div>
                    )
                }


            </div>

        </div>
    );
};

export default ManageStartupPost;