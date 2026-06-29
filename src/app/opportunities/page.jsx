"use client"

import useRole from '@/hooks/useRole';
import { SealCheck } from '@gravity-ui/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BriefcaseBusiness, CalendarDays, ChevronLeft, ChevronRight, Clock3, Search, SlidersHorizontal, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdArrowBackIos } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { button, li } from 'motion/react-client';



const workTypes = ["Remote", "On-site", "Hybrid", "Flexible", "Part-time Remote", "Full-time Remote", "Internship"];
// const industries = [
//     "Full-time",
//     "Part-time",
//     "Freelance",
//     "Contract",
//     "Internship",
//     "Volunteer",
//     "Co-founder"
// ];
const industries = [
    "Technology",
    "Artificial Intelligence",
    "Software Development",
    "HealthTech",
    "Educational",
    "E-commerce",

    "Cyber Security",
    "Gaming",
    "Media & Entertainment",
    "Marketing & Advertising",
    "Travel & Tourism",
    "Real Estate",
    "Logistics & Transportation",
    "Fashion & Lifestyle",
    "Robotics",
    "Other"
];

const Opportunities = () => {

    const { role, roleLoading } = useRole() // role,roleLoading 
    const [search, setSearch] = useState("");
    const [workType, setWorkType] = useState("");
    const [industry, setIndustry] = useState("")
    const [pageState, setPageState] = useState(1)

    const [totalOpportunityCount, setTotalOpportunityCount] = useState(() => {
        if (typeof window !== "undefined") {
            const result = localStorage.getItem("totalOpportunityCount")
            return result ? Number(result) : undefined
        }

        return undefined
    })
    const handleOpportunityCount = (num) => {
        localStorage.setItem("totalOpportunityCount", num)
        setTotalOpportunityCount(num)
    }

    useEffect(() => {
        return () => localStorage.removeItem("totalOpportunityCount")
    }, [])

    console.log(role)
    const limit = 9


    const { data, isLoading } = useQuery({
        queryKey: ["all-opportunity", search, workType, industry, pageState],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/opportunity?search=${search}&workType=${workType}&industry=${industry}&limit=${limit}&skip=${(pageState - 1) * limit}`)
            if (result?.data?.dataCount && !search) {
                handleOpportunityCount(result.data.dataCount)
            }
            return result.data
        }
    })
    // console.log()
    const handleSearch = (e) => {
        setWorkType("")
        setSearch(e.target.value)

    }

    console.log(role)
    console.log(roleLoading)
    console.log(!roleLoading && role === "collaborator")





    return (
        <div className='dark-bg min-h-screen py-10'>
            <section className='space-y-8'>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                    <div>
                        <p className='flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300'>
                            <Sparkles size={16} />
                            Startup roles
                        </p>
                        <h1 className='mt-2 text-4xl font-bold text-white md:text-5xl'>Opportunities</h1>
                        <p className='mt-3 max-w-2xl text-gray-400'>
                            Discover roles from founders and teams looking for collaborators.
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-3 rounded-xl border border-cyan-400/20 bg-white/10 p-4 text-center'>
                        <div>
                            <h2 className='text-2xl font-bold text-white'>{totalOpportunityCount}</h2>
                            <p className='text-xs text-gray-400'>Total</p>
                        </div>
                        <div>
                            {/* kaj baki */}
                            <h2 className='text-2xl font-bold text-cyan-300'>{data?.result.length}</h2>
                            <p className='text-xs text-gray-400'>Showing</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold text-[#ff7900]'>{industries?.length}</h2>
                            <p className='text-xs text-gray-400'>Industries</p>
                        </div>
                    </div>
                </div>

                <div className='grid gap-4 rounded-xl border border-white/10 bg-white/10 p-4 lg:grid-cols-[1.4fr_1fr_1fr]'>
                    <label className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#001b3c] px-4 py-3 text-white'>
                        <Search size={20} className='text-cyan-300' />
                        <input
                            value={search}
                            onChange={handleSearch}
                            type='text'
                            placeholder='Search title, email, skill...'
                            className='w-full bg-transparent text-sm outline-none placeholder:text-gray-500'
                        />
                    </label>

                    <label className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#001b3c] px-4 py-3 text-white'>
                        <BriefcaseBusiness size={20} className='text-cyan-300' />
                        <select
                            defaultValue={" All Work Types"}
                            onChange={(e) => setWorkType(e.target.value)}
                            className='w-full bg-transparent text-sm outline-none'
                        >
                            <option className='text-black' value=''>All work types</option>
                            {workTypes.map((type) => (
                                <option className='text-black' key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>

                    <label className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#001b3c] px-4 py-3 text-white'>
                        <SlidersHorizontal size={20} className='text-cyan-300' />
                        <select
                            defaultValue={"All industries"}
                            onChange={(e) => setIndustry(e.target.value)}
                            className='w-full bg-transparent text-sm outline-none'
                        >
                            <option className='text-black' value=''>All Industries</option>
                            {industries?.map((industry) => (
                                <option className='text-black' key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                        {isLoading ? (
                            <div className='col-span-full rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center text-white'>
                                <span className="loading loading-spinner text-success"></span>
                            </div>
                        ) : data.result?.length ? (
                            data.result.map((opportunity, index) => (
                                <article key={opportunity._id || index} className='rounded-xl border border-cyan-400/20 bg-white/10 p-5 shadow-xl shadow-black/10'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <div>
                                            <h2 className='text-xl font-bold text-white'>{opportunity.title}</h2>
                                            <p className='mt-1 break-all text-sm text-gray-400'>{opportunity.userEmail}</p>
                                        </div>
                                        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-black'>
                                            <BriefcaseBusiness size={20} />
                                        </span>
                                    </div>

                                    <div className='mt-5 flex flex-wrap gap-2'>
                                        <span className='rounded-full bg-cyan-300 px-3 py-1 text-xs font-semibold text-black'>{opportunity.workType}</span>
                                        <span className='rounded-full bg-[#ff7900] px-3 py-1 text-xs font-semibold text-white'>{opportunity.commitmentLevel || "industries not set"}</span>
                                    </div>

                                    <div className='mt-5 space-y-3 text-sm'>
                                        <p className='flex items-center gap-2 text-gray-300'>
                                            <CalendarDays size={17} className='text-cyan-300' />
                                            Deadline: {opportunity.applicationDeadline}
                                        </p>
                                        <p className='flex items-center gap-2 text-gray-300'>
                                            <Users size={17} className='text-cyan-300' />
                                            Skills: {opportunity.requireSkills}
                                        </p>
                                        <p className='flex items-center gap-2 text-gray-300'>
                                            <Clock3 size={17} className='text-cyan-300' />
                                            ID: {opportunity._id}
                                        </p>
                                    </div>
                                    {!roleLoading && role === "collaborator" && <Link href={`/opportunities/${opportunity._id}`} className='w-full btn bg-cyan-400 border-none shadow-none'>View Details</Link>}


                                </article>

                            ))


                        )

                            : (
                                <div className='col-span-full rounded-xl border border-cyan-400/20 bg-white/10 p-8 text-center'>
                                    <h2 className='text-xl font-semibold text-white'>No opportunities found</h2>
                                    <p className='mt-2 text-gray-400'>Try changing the search or filter fields.</p>
                                </div>
                            )}
                    </div>
                    {totalOpportunityCount &&

                        <div className='text-center text-white flex items-center justify-center gap-3 mt-4'>
                            <button onClick={() => setPageState(pageState - 1)} disabled={pageState === 1} className='bg-cyan-400/10 border disabled:opacity-60 border-cyan-400/80 text-cyan-400 p-2 rounded-md items-center justify-center'><ChevronLeft /></button>
                            {
                                [...Array(Math.ceil(Number(totalOpportunityCount) / limit))].map((_, index) =>
                                    <button onClick={() => setPageState(index + 1)} className='bg-cyan-400/80 px-2 rounded-md' key={index}>{index + 1}</button>
                                )
                            }
                            <button onClick={() => setPageState(pageState + 1)} disabled={pageState === Math.ceil(Number(totalOpportunityCount) / limit)} className='bg-cyan-400/10 border disabled:opacity-60 border-cyan-400/80 text-cyan-400 p-2 rounded-md items-center justify-center'><ChevronRight /></button>
                        </div>
                    }

                </div>
            </section>
        </div>
    );
};

export default Opportunities;
