"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Search } from 'lucide-react';
import { h1 } from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const BrowseStartups = () => {
    // http method :get method
    // api name :startup


    // const { data } = useQuery({
    //     queryKey: "name of query",
    //     queryFn: "fn of query (fetch)"
    // })

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
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")

    const { data, isLoading } = useQuery({
        queryKey: ["browse-startup", search, filter],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/startups?status=accept&search=${search}&filter=${filter}`)
            return result.data
        }

    })
    console.log(data)

    const handleFilter = (e) => {
        setSearch("")
        setFilter(e.target.value)
        console.log("filter")
    }


    const handleSearch = (e) => {
        setFilter("")
        setSearch(e.target.value)
        console.log("search")

    }




    return (
        <div className='dark-bg h-full'>
            {/* <h1 > </h1> */}

            <section>
                <h1 className='text-white text-3xl text-center'>Browse Startups</h1>
                <p className='text-gray-500 text-center'>Browse all startups here!</p>
                <div className=' bg-white/10 p-4 flex gap-2 items-center justify-center'>
                    <label className='input w-full dark-bg' >
                        <Search color='#00d3f2' />
                        <input onChange={handleSearch} type="text" />
                    </label>

                    <select onChange={handleFilter} defaultValue={"All Industry"} className='select w-full items-start justify-center   text-white dark-bg' >
                        <option value="">All Industry</option>
                        {
                            industries.map((industry, index) =>
                                <option key={index} >{industry}</option>
                            )
                        }
                    </select>
                </div>

                <div className=''>All Industries</div>






                <div className='p-5 grid  grid-cols-3  gap-3'>
                    {
                        isLoading ? (
                            <div className='col-span-full flex justify-center p-8'>
                                <span className="loading loading-spinner text-success"></span>
                            </div>
                        ) : data?.map((startup, index) =>
                            <Link href={`/startups/${startup._id}`} key={index} className='border rounded-md p-5'>
                                <div className='flex gap-2 '>
                                    <Image
                                        src={startup.image}
                                        alt='image'
                                        width={100}
                                        height={100}
                                        className='object-cover rounded-md'


                                    />
                                    <div>
                                        <h1 className='text-white text-md '>{startup.name}</h1>
                                        <div className='flex gap-2'>
                                            <h1 className='text-sm text-black  border p-1 rounded-full bg-cyan-400'>{startup.industry}</h1>
                                            <h1 className='text-sm text-black  border p-1 rounded-full bg-cyan-400'>{startup.fundingStage}</h1>

                                        </div>
                                        <p className='text-gray-500 text-sm'>{startup.userEmail}</p>
                                        <p className='text-gray-500 text-sm'>{startup.description}</p>
                                    </div>
                                </div>

                            </Link>
                        )

                    }

                </div>
            </section>

        </div>
    );
};

export default BrowseStartups;
