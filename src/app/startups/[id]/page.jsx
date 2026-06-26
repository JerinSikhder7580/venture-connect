"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

const StartupDetailsPage = () => {
    const { id } = useParams()
    console.log(id)


    const { data } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/startup/${id}`)

        }
    })
    console.log(id)
    return (
        <div className='dark-bg h-screen'>
            <section>
                <div>
                    <h1 className='text-white'>hlwwwww</h1>

                </div>
            </section>
        </div>
    );
};

export default StartupDetailsPage;