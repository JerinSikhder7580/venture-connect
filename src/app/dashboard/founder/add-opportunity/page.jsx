"use client"

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";


const PostTeamRequirements = () => {
    const { data: session } = authClient.useSession()
    const userEmail = session?.user?.email
    console.log(userEmail)



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




    const { data: startup, isLoading } = useQuery({
        queryKey: ['isStartup'],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/isStartup?userEmail=${userEmail}`)
            // console.log(result)
            return result.data

        },
        enabled: !!userEmail
    })
    console.log(startup)



    // const { data: opportunity, isLoading: isLoading2, refetch } = useQuery({
    //     queryKey: ["user-opportunity"],
    //     queryFn: async () => {
    //         console.log(userEmail)
    //         const result = await axios.get(`http://localhost:8000/user/opportunity?email=${userEmail}`)
    //         if (result.data) {
    //             return 3 - Number(result.data?.opportunity)
    //         }
    //     },
    //     enabled: userEmail ? true : false

    // })
    // 3 = 0

    const { data: user, isLoading: isLoading2, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            // console.log(userEmail)
            const result = await axios.get(`http://localhost:8000/user?email=${userEmail}`)
            console.log(result)
            return result.data
        },
        enabled: userEmail ? true : false

    })
    console.log(user?.opportunity)
    // 3 = 0
    // 2 = 1 
    // 1 = 2
    // 0 = 3
    if (isLoading || isLoading2) {
        return <div className="flex items-center justify-center h-full"><span className="loading loading-spinner text-success"></span></div>
    }


    // console.log(id)
    // write about load
    // const isStartup = typeof startup?.id === 'string' ? false : startup?.id?._id[0] ? true : false
    const isStartup = typeof startup === "string" ? false : true
    console.log(isStartup)


    // #00142c
    const handlePostOpportunity = (e) => {
        e.preventDefault()
        if (user?.opportunity > 2) {
            return

        }

        const formData = new FormData(e.target)
        formData.append("startupName", startup.name)
        formData.append("userEmail", userEmail)
        const data = Object.fromEntries(formData.entries())
        toast.promise(async () => {

            const result = await axios.post(`http://localhost:8000/opportunity?email=${userEmail}`, data)
            return result.data
        },
            {
                loading: "Posting Opportunity",
                success: async () => {
                    await refetch()
                    return "Posted Successfully"
                },
                error: "Failed to post opportunity"
            }
        )

    }


    return (
        <div className="  ">
            <Toaster />

            <h1 className='text-white text-xl mb-3'>Post Team Requirement</h1>
            {user?.email && user.plan === "free" &&

                < h1 className=" flex justify-end text-[#ff7900]">{(3 - user?.opportunity)}/3 Opportunities</h1>
            }
            {
                isStartup ?
                    <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
                        <div className="w-full shrink-0 bg-[#001836] p-5 shadow-2xl">
                            <div className="card-body">
                                <form onSubmit={handlePostOpportunity} className={`[&_input]:bg-white/10 [&_select]:bg-white/10 ${!isStartup ? "hidden" : ""}`}>

                                    <fieldset className="fieldset">
                                        <label className="label text-white">Role Title</label>
                                        <input type="text" name="title" className="input border text-gray-500" placeholder="Role Title" />
                                        <div className="flex gap-2">
                                            <div>
                                                <label className="label text-white">Work type</label>
                                                <select className="select border items-center justify-center text-gray-500" name="workType" defaultValue={""}>
                                                    <option value={""} disabled>Work Type</option>
                                                    {
                                                        workTypes.map((workType, index) =>
                                                            <option key={index}>{workType}</option>
                                                        )
                                                    }

                                                </select>
                                            </div>
                                            <div>

                                                <label className="label text-white">Commitment Level</label>
                                                <select className="select border items-start justify-center text-gray-500" name="commitmentLevel" defaultValue={""}>
                                                    <option value={""} disabled>Commitment Level</option>

                                                    {
                                                        commitmentLevels.map((commitment, index) =>
                                                            <option key={index}>{commitment}</option>
                                                        )
                                                    }


                                                </select>
                                            </div>
                                        </div>




                                        <label className="label text-white">Require Skills</label>
                                        <input type="text" className="input border text-gray-500" placeholder="Require Skills" name="requireSkills" />

                                        <div><a className="  text-white">Application Deadline</a></div>
                                        <input type="date" className="input border text-gray-500" name="applicationDeadline" />
                                        {/* {console.log(user?.opportunity)} */}
                                        <button disabled={user?.opportunity === 0 && user.plan === "free"} className="btn btn-neutral mt-4">Post Opportunity</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>

                        {/* premium */}
                        {user?.opportunity === 0 && user?.plan === 'free' &&

                            < section className="relative overflow-hidden border border-[#ff7900]/40 bg-[#001836] p-6 shadow-2xl shadow-orange-950/20">
                                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#ff7900]/20"></div>
                                <div className="relative space-y-5 p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <span className="rounded-full border border-[#ff7900]/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ff7900]">
                                            Premium
                                        </span>
                                        <span className="text-sm font-semibold text-white/70">Best for growing teams</span>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Upgrade to Premium</h2>
                                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                                            Get more room to post roles, promote urgent openings, and reach collaborators faster.
                                        </p>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <div className="border border-white/10 bg-white/5 p-4">
                                            <h3 className="text-2xl font-bold text-white">10+</h3>
                                            <p className="mt-1 text-sm text-gray-400">active opportunities</p>
                                        </div>
                                        <div className="border border-white/10 bg-white/5 p-4">
                                            <h3 className="text-2xl font-bold text-white">2x</h3>
                                            <p className="mt-1 text-sm text-gray-400">profile visibility</p>
                                        </div>
                                        <div className="border border-white/10 bg-white/5 p-4">
                                            <h3 className="text-2xl font-bold text-white">Top</h3>
                                            <p className="mt-1 text-sm text-gray-400">featured placement</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 text-sm text-gray-200">
                                        <li className="flex gap-3">
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff7900]"></span>
                                            Highlight premium opportunities in search results.
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff7900]"></span>
                                            Keep hiring momentum when your free posts are used.
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff7900]"></span>
                                            Build a stronger founder presence with priority exposure.
                                        </li>
                                    </ul>

                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <form action="/api/checkout_sessions" method="POST">
                                            <section>
                                                <button className="bg-cyan-400 btn border-none" type="submit" role="link">
                                                    Upgrade to premium <p> $9/per month</p>
                                                </button>
                                            </section>
                                        </form>

                                        <p className="text-sm text-gray-400">Premium checkout coming soon</p>
                                    </div>
                                </div>
                            </section>

                        }


                    </div>
                    :

                    <div className="flex items-center justify-center h-full ">
                        <div className="border border-white/10 p-10 text-center">
                            <h1 className="text-center text-4xl text-white">Make a startup profile first</h1>
                            <Link href={"/dashboard/founder/my-startup"} className="btn border-none mt-4 bg-[#ff7900] text-center justify-center items-center "> Create Startup</Link>


                        </div>
                    </div>
            }

        </div >
    );
};

export default PostTeamRequirements;
