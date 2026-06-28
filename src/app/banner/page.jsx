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

                {/* <Image
                    src='/banner.png'
                    alt='Banner'

                    fill
                    className='object-cover'

                /> */}
                {/* <div className='' style={{backgroundImage:"url('/banner.png')"}} >
                    
                </div> */}
                <div >


                    <div className="flex items-center h-230 z-10 bg-[url('/banner.png')] bg-center bg-no-repeat bg-cover">
                        <div className='p-8'>
                            <div className='  space-y-2 '>
                                <motion.div
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: .6 }}
                                    whileInView={{ once: true }}

                                >
                                    <h1 className='text-5xl font-bold text-white'>Build Your People.</h1>
                                    <h1 className='font-bold text-5xl text-white'>Build Something <span className='text-[#00d3f2] '>Great</span></h1>
                                </motion.div>
                                <motion.p
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: .6, delay: .1 }}
                                    whileInView={{ once: true }}
                                    className='text-gray-400 text-xl font-semibold'>VentureConnect connects founders with talented collaborators to build <br /> amazing startups together.Post opportunities,discover ideas and build yours dream teams</motion.p>
                            </div>
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: .6, delay: .2 }}
                                whileInView={{ once: true }}
                                className='flex gap-2 mt-4'>
                                <Link href={"/opportunities"} className='text-white items-center justify-center flex p-2  secondary-bg rounded-md'>Explore opportunities <ArrowRight  /></Link>
                                <Button className='background rounded-md p-6 flex items-center justify-center'>How it works</Button>
                            </motion.div>
                        </div>
                    </div>





                </div>

            </div>
        </div>
    );
};

export default Banner;