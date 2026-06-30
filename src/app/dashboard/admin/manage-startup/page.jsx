"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const ManageStartupPost = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["pending-startups"],
        queryFn: async () => {
            console.log("working");
            const result = await axios.get(
                "https://venture-connect-server-kappa.vercel.app/startups?status=pending"
            );
            return result.data;
        },
    });

   
    const handleStatus = (id, status) => {
        toast.promise(
            axios.patch(`https://venture-connect-server-kappa.vercel.app/startup/${id}`, { status }),
            {
                loading: `${status}ing`,
                success: () => {
                    refetch();
                    return `${status}ed`;
                },
                error: "Failed",
            }
        );
    };

    console.log(data, isLoading);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <Toaster />

            <h1 className="text-white text-2xl sm:text-3xl font-bold">
                ManageStartupPost
            </h1>

            <p className="text-sm sm:text-md text-gray-500 mb-6">
                Manage startup post here!
            </p>

            {isLoading && (
                <div className="flex justify-center p-8">
                    <span className="loading loading-spinner text-success"></span>
                </div>
            )}

            {!data?.[0] && !isLoading && (
                <h1 className="text-white text-center">No Data Found</h1>
            )}

            <div className="space-y-6">
                {!isLoading &&
                    data?.map((startup, index) => (
                        <div
                            key={index}
                            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border border-gray-700 rounded-lg p-5"
                        >
                            {/* Left Section */}
                            <div className="space-y-3 w-full">
                                <Image
                                    src={startup?.image}
                                    width={100}
                                    height={100}
                                    alt="image"
                                    className="w-full sm:w-44 h-44 object-cover rounded-lg"
                                />

                                <h1 className="text-white text-xl sm:text-2xl font-semibold">
                                    {startup?.name}
                                </h1>

                                <div className="flex flex-wrap gap-3">
                                    <p className="text-white border rounded-md px-3 py-2 text-sm">
                                        {startup?.industry}
                                    </p>

                                    <p className="text-white border rounded-md px-3 py-2 text-sm">
                                        {startup?.fundingStage}
                                    </p>
                                </div>

                                <p className="text-gray-500 text-sm break-words">
                                    {startup?.description}
                                </p>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <button
                                    onClick={() => handleStatus(startup._id, "accept")}
                                    className="btn bg-green-300 border-none w-full sm:w-auto"
                                >
                                    Accepted
                                </button>

                                <button
                                    onClick={() => handleStatus(startup._id, "reject")}
                                    className="btn bg-red-300 border-none w-full sm:w-auto"
                                >
                                    Rejected
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ManageStartupPost;