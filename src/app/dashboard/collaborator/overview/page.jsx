import Link from 'next/link';
import React from 'react';

const Overview = () => {
    return (
        <div>
            <h1 className='text-cyan-400 text-4xl  px-5 py-3'>Welcome <span className='active'>!</span></h1>
            <section>
                <div className='grid grid-cols-3 gap-3  '>
                    <Link href={"/opportunities"} className='border p-25 text-center bg-white/10'>
                        <h1  className='text-white'>Browse Opportunities</h1>
                    </Link>
                    <Link href={"/dashboard/collaborator/my-applications"} className='border p-25 text-center bg-white/10'>
                        <h1  className='text-white'>My Application</h1>
                    </Link>
                    <Link href={"/dashboard/collaborator/profile"} className='border p-25 text-center bg-white/10'>
                        <h1  className='text-white'>Update Profile</h1>
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default Overview;