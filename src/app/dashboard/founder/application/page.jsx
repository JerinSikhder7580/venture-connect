"use client"
import useUserEmail from "@/hooks/useUserEmail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Application = () => {

    const userEmail = useUserEmail()

    const { data: startup, isLoading: startupLoading } = useQuery({
        queryKey: ["my-startup"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/startups?userEmail=${userEmail}`)
            return result.data?.[0]

        },
        enabled: userEmail ? true : false
    })
    console.log(startup)
    const { data: applications, isLoading: applicationsLoading, refetch } = useQuery({
        queryKey: ["application"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/applications?startupName=${startup.name}`)
            return result.data
        },
        enabled: startup?.length !== 0 ? true : false
    })
    console.log(applications);
    const test = applications?.status === "pending" ? true : false
    console.log(test)
    const handleStatus = (id, status) => {


        toast.promise(
            axios.patch(`https://venture-connect-server-kappa.vercel.app/application?status=${status}&id=${id}`),
            {
                loading: "Updating",
                success: () => {
                    refetch()
                    return "Updated"

                },
                error: "Failed to update"
            }
        )

        console.log(status)
    }


    return (
        <div className="min-h-screen bg-[#00142c] p-5">
            <Toaster />

            <div className="mx-auto max-w-6xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Applications
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Review collaborator applications for your opportunities.
                    </p>
                </div>


                <div className="grid gap-6">

                    {
                        startupLoading || applicationsLoading ? (
                            <div className="flex justify-center p-8">
                                <span className="loading loading-spinner text-success"></span>
                            </div>
                        ) : applications?.map((application) => (

                            <div
                                key={application._id}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00d3f2]/50"
                            >


                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


                                    <div>


                                        <h2 className="text-xl font-bold text-white">
                                            {application.opportunityTitle}
                                        </h2>


                                        <p className="mt-1 text-[#00d3f2]">
                                            {application.startupName}
                                        </p>


                                        <div className="mt-4 space-y-2 text-sm text-gray-300">

                                            <p>
                                                <span className="text-gray-400">
                                                    Applicant:
                                                </span>{" "}
                                                {application.applicantEmail}
                                            </p>


                                            <p>
                                                <span className="text-gray-400">
                                                    Portfolio:
                                                </span>{" "}
                                                <a
                                                    href={application.portfolioLink}
                                                    target="_blank"
                                                    className="text-[#00d3f2] hover:underline"
                                                >
                                                    View Portfolio
                                                </a>
                                            </p>


                                            <p>
                                                <span className="text-gray-400">
                                                    Applied:
                                                </span>{" "}
                                                {new Date(application.appliedAt).toLocaleDateString()}
                                            </p>


                                        </div>


                                        <p className="mt-4 max-w-xl text-gray-300">
                                            {application.motivationMessage}
                                        </p>


                                    </div>




                                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col">

                                        {
                                            application.status === "pending" &&
                                            <>
                                                <button onClick={() => handleStatus(application._id, "accepted")}
                                                    className="rounded-xl bg-[#00d3f2] px-6 py-2 font-semibold text-[#00142c] transition hover:bg-white"
                                                >
                                                    Accept
                                                </button>


                                                <button onClick={() => handleStatus(application._id, "rejected")}
                                                    className="rounded-xl border border-red-400 px-6 py-2 font-semibold text-red-400 transition hover:bg-red-400 hover:text-white"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        }

                                    </div>


                                </div>



                                <div className="mt-5">

                                    <span
                                        className={`rounded-full px-4 py-1 text-sm ${application.status === "pending"
                                            ? "bg-yellow-400/20 text-yellow-300"
                                            : application.status === "accepted"
                                                ? "bg-[#00d3f2]/20 text-[#00d3f2]"
                                                : "bg-red-400/20 text-red-400"
                                            }`}
                                    >
                                        {application.status}
                                    </span>

                                </div>


                            </div>

                        ))
                    }


                </div>


            </div>

        </div>
    );
};

export default Application;
