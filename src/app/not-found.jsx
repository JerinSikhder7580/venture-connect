import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
    return (
        <main className='min-h-[70vh] bg-[#00142c] px-6 py-16 text-white'>
            <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
                <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10'>
                    <SearchX className='text-cyan-300' size={42} />
                </div>



                <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300'>404 Error</p>
                <h1 className='mt-4 text-4xl font-bold md:text-6xl'>Page Not Found</h1>
                <p className='mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg'>
                    The page you are looking for does not exist or may have been moved. You can return home or continue exploring VentureConnect.
                </p>



                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                    <Link href='/' className='btn border-none bg-cyan-400 text-white hover:bg-cyan-500'>
                        <Home size={18} />
                        Go Home
                    </Link>

                    <Link href='/opportunities' className='btn border border-cyan-400 bg-transparent text-cyan-300 hover:bg-cyan-400 hover:text-white'>
                        Browse Opportunities
                    </Link>
                    
                    <Link href='/startups' className='btn border border-white/20 bg-white/10 text-white hover:bg-white/20'>
                        <ArrowLeft size={18} />
                        Browse Startups
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
