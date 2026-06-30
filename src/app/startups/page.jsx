"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const BrowseStartups = () => {


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

            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/startups?status=accept&search=${search}&filter=${filter}`) // 

            return result.data

        }

    })



    const handleFilter = (e) => {

        setSearch("")

        setFilter(e.target.value)

    }



    const handleSearch = (e) => {

        setFilter("")

        setSearch(e.target.value)

    }





    return (

        <div className='dark-bg min-h-screen px-3 sm:px-6 lg:px-10 py-6 sm:py-10'>


            <section className='w-full'>


                <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl text-center font-semibold'>

                    Browse Startups

                </h1>



                <p className='text-gray-500 text-center text-sm sm:text-base mt-2'>

                    Browse all startups here!

                </p>





                <div className='bg-white/10 rounded-lg p-3 sm:p-4 mt-5 flex flex-col lg:flex-row gap-3 items-center'>


                    <label className='input w-full dark-bg flex items-center gap-2'>


                        <Search
                            color='#00d3f2'
                            size={20}
                        />


                        <input

                            onChange={handleSearch}

                            type="text"

                            placeholder="Search startups..."

                            className="w-full text-sm sm:text-base"

                        />


                    </label>





                    <select

                        onChange={handleFilter}

                        defaultValue={"All Industry"}

                        className='select w-full lg:w-1/3 text-white dark-bg text-sm sm:text-base'

                    >


                        <option value="">

                            All Industry

                        </option>



                        {

                            industries.map((industry, index) =>

                                <option key={index}>

                                    {industry}

                                </option>

                            )

                        }



                    </select>



                </div>






                <div className='text-white text-lg sm:text-xl mt-6 mb-3'>

                    All Industries

                </div>







                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-1 sm:p-3 lg:p-5'>


                    {


                        isLoading ? (


                            <div className='col-span-full flex justify-center p-8'>

                                <span className="loading loading-spinner text-success"></span>

                            </div>



                        ) : data?.map((startup, index) =>



                            <Link

                                href={`/startups/${startup._id}`}

                                key={index}

                                className='border border-white/20 rounded-md p-4 hover:border-cyan-400 transition overflow-hidden w-full'

                            >



                                <div className='flex flex-col sm:flex-row gap-4'>



                                    <Image

                                        src={startup.image}

                                        alt='image'

                                        width={100}

                                        height={100}

                                        className='object-cover rounded-md w-full h-44 sm:w-24 sm:h-24 shrink-0'

                                    />





                                    <div className='min-w-0 flex-1'>


                                        <h1 className='text-white text-base sm:text-lg font-semibold break-words'>

                                            {startup.name}

                                        </h1>





                                        <div className='flex flex-wrap gap-2 mt-2'>


                                            <h1 className='text-xs sm:text-sm text-black border px-2 py-1 rounded-full bg-cyan-400'>

                                                {startup.industry}

                                            </h1>



                                            <h1 className='text-xs sm:text-sm text-black border px-2 py-1 rounded-full bg-cyan-400'>

                                                {startup.fundingStage}

                                            </h1>



                                        </div>





                                        <p className='text-gray-500 text-xs sm:text-sm break-all mt-2'>

                                            {startup.userEmail}

                                        </p>





                                        <p className='text-gray-500 text-sm line-clamp-3 mt-1'>

                                            {startup.description}

                                        </p>



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