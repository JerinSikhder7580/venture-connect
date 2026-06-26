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




    const { data: id, isLoading } = useQuery({
        queryKey: ['isStartup'],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/isStartup?userEmail=${userEmail}`)
            // console.log(result)
            return result.data

        },
        enabled: !!userEmail
    })



    const { data: opportunity, isLoading: isLoading2, refetch } = useQuery({
        queryKey: ["user-opportunity"],
        queryFn: async () => {
            console.log(userEmail)
            const result = await axios.get(`http://localhost:8000/user/opportunity?email=${userEmail}`)
            if (result.data) {
                return 3 - Number(result.data?.opportunity)
            }
        },
        enabled: userEmail ? true : false

    })
    // 3 = 0
    // 2 = 1 
    // 1 = 2
    // 0 = 3
    if (isLoading && isLoading2) {
        return <div className="flex items-center justify-center h-full"><span className="loading loading-spinner text-info"></span></div>
    }


    // console.log(id)
    // write about load
    const isStartup = typeof id === 'string' ? false : id?._id[0] ? true : false
    console.log(isStartup)

    // #00142c
    const handlePostOpportunity = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
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
            <h1 className=" flex justify-end text-[#ff7900]">{opportunity}/3 Opportunities</h1>
            {
                isStartup ?
                    <div className="  w-full max-w-sm shrink-0 shadow-2xl bg-[#001836] p-5">
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
                                    <button className="btn btn-neutral mt-4">Post Opportunity</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    :

                    <div className="flex items-center justify-center h-full ">
                        <div className="border border-white/10 p-10 text-center">
                            <h1 className="text-center text-4xl text-white">Make a startup profile first</h1>
                            <Link href={"/dashboard/founder/my-startup"} className="btn border-none mt-4 bg-[#ff7900] text-center justify-center items-center "> Create Startup</Link>


                        </div>
                    </div>
            }

        </div>
    );
};

export default PostTeamRequirements;