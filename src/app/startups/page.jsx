"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { h1 } from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';

const BrowseStartups = () => {
    // http method :get method
    // api name :startup


    // const { data } = useQuery({
    //     queryKey: "name of query",
    //     queryFn: "fn of query (fetch)"
    // })

    const { data } = useQuery({
        queryKey: ["browse-startup"],
        queryFn: async () => {
            const result = await axios.get("http://localhost:8000/startups?status=accept")
            return result.data
        }

    })
    console.log(data)






    return (
        <div className='dark-bg h-full'>
            <section>
                <h1 className='text-white text-3xl text-center'>Browse Startups</h1>
                <p className='text-gray-500 text-center'>Browse all startups here!</p>
                <div className=''>All Industries</div>






                <div className='p-5 grid  grid-cols-3  gap-3'>
                    {
                        data?.map((startup, index) =>
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