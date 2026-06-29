"use client"
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { motion } from "motion/react"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
    return (
        <div >
            <div className=' '>

               
                <div >


                    <div className="flex min-h-[620px] items-center bg-[url('/banner.png')] bg-center bg-no-repeat bg-cover py-20 sm:min-h-[720px] lg:min-h-[860px]">
                        <div className='w-full max-w-4xl px-4 sm:px-8 lg:px-12'>
                            <div className='space-y-3'>
                                <motion.div
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: .6 }}
                                    whileInView={{ once: true }}

                                >
                                    <h1 className='text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl'>Build Your People.</h1>
                                    <h1 className='text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl'>Build Something <span className='text-[#00d3f2] '>Great</span></h1>
                                </motion.div>
                                <motion.p
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: .6, delay: .1 }}
                                    whileInView={{ once: true }}
                                    className='max-w-2xl text-base font-semibold leading-7 text-gray-300 sm:text-lg lg:text-xl'>VentureConnect connects founders with talented collaborators to build amazing startups together. Post opportunities, discover ideas and build your dream teams.</motion.p>
                            </div>

                            
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: .6, delay: .2 }}
                                whileInView={{ once: true }}
                                className='mt-6 flex flex-col gap-3 sm:flex-row'>
                                <Link href={"/opportunities"} className='flex items-center justify-center gap-2 rounded-md px-5 py-3 text-white secondary-bg'>Explore opportunities <ArrowRight  /></Link>
                                <Button className='background rounded-md px-5 py-6 flex items-center justify-center'>How it works</Button>
                            </motion.div>
                        </div>
                    </div>





                </div>

            </div>
        </div>
    );
};

export default Banner;
