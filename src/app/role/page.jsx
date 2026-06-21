"use client"

import { useRouter } from "next/navigation";

const SelectRole = () => {
    const router = useRouter();

    const handleSelectRole = (role) => {
        router.push(`/register/${role}`);


    }
    return (
        <div className='h-full dark-bg border border-t-[#00d3f2]'>
            <div className='flex justify-center gap-5 h-full items-center'>
                <div onClick={() => handleSelectRole("founder")} className='background h-52 w-52 rounded text-2xl font-bold text-[#00142c] flex items-center justify-center border  outline  cursor-pointer '>Founder</div>
                <div onClick={() => handleSelectRole("collaborator")} className='background h-52 w-52 rounded text-2xl font-bold text-[#00142c] flex items-center justify-center border  cursor-pointer '>Collaborator</div>
            </div>
        </div>
    );
};

export default SelectRole;