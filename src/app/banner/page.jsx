"use client"

import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { motion } from "motion/react"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
    return (
        <div>

            <div>


                <div className="flex min-h-[520px] sm:min-h-[620px] lg:min-h-[860px] items-center bg-[url('/banner.png')] bg-center bg-no-repeat bg-cover py-14 sm:py-20">


                    <div className='w-full max-w-4xl px-4 sm:px-8 lg:px-12'>


                        <div className='space-y-4'>


                            <motion.div

                                initial={{ y: 40, opacity: 0 }}

                                animate={{ y: 0, opacity: 1 }}

                                transition={{ duration: .6 }}

                                whileInView={{ once: true }}

                            >


                                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white'>
                                    Build Your People.
                                </h1>


                                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white'>
                                    Build Something
                                    <span className='text-[#00d3f2]'> Great</span>
                                </h1>


                            </motion.div>





                            <motion.p

                                initial={{ y: 40, opacity: 0 }}

                                animate={{ y: 0, opacity: 1 }}

                                transition={{ duration: .6, delay: .1 }}

                                whileInView={{ once: true }}

                                className='max-w-xl sm:max-w-2xl text-sm sm:text-base lg:text-xl font-semibold leading-6 sm:leading-7 text-gray-300'

                            >

                                VentureConnect connects founders with talented collaborators to build amazing startups together. Post opportunities, discover ideas and build your dream teams.

                            </motion.p>



                        </div>





                        <motion.div

                            initial={{ y: 40, opacity: 0 }}

                            animate={{ y: 0, opacity: 1 }}

                            transition={{ duration: .6, delay: .2 }}

                            whileInView={{ once: true }}

                            className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center'

                        >



                            <Link

                                href={"/opportunities"}

                                className='flex w-full sm:w-auto items-center justify-center gap-2 rounded-md px-5 py-3 text-white secondary-bg text-sm sm:text-base'

                            >

                                Explore opportunities

                                <ArrowRight size={18} />

                            </Link>





                            <Button

                                className='w-full sm:w-auto background rounded-md px-5 py-6 flex items-center justify-center text-sm sm:text-base'

                            >

                                How it works

                            </Button>



                        </motion.div>



                    </div>


                </div>



            </div>


        </div>
    );
};

export default Banner;