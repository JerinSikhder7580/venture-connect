"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeatureStartups = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["Featured-startups"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/featured-startups`)
            return result.data
        }
    })

    return (
        <div className="dark-bg">

            <section className="px-5 py-16">
                <div className="mx-auto max-w-7xl">

                    <div className="text-center">
                        <p className="text-[#00d3f2] font-semibold">
                            Startup Showcase
                        </p>

                        <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">
                            Featured Startups
                        </h1>

                        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                            Explore innovative startups and discover ideas built by
                            passionate founders from VentureConnect.
                        </p>
                    </div>


                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {
                            isLoading ? (
                                <div className="col-span-full flex justify-center p-8">
                                    <span className="loading loading-spinner text-success"></span>
                                </div>
                            ) : data?.map((startup) => (

                                <div
                                    key={startup._id}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:-translate-y-2 transition duration-300"
                                >

                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00d3f2]/20 blur-2xl group-hover:bg-[#00d3f2]/40 transition"></div>


                                    <div className="relative">


                                        <div className="flex items-center justify-between">

                                            <div className="h-14 w-14 rounded-2xl bg-[#00d3f2] flex items-center justify-center text-[#00142c] font-bold text-xl">
                                                {startup?.name?.charAt(0)}
                                            </div>


                                            <span className="rounded-full bg-[#00d3f2]/20 px-3 py-1 text-xs text-[#00d3f2]">
                                                Startup
                                            </span>

                                        </div>



                                        <h2 className="mt-6 text-2xl font-bold text-white">
                                            {startup?.name}
                                        </h2>



                                        <div className="mt-5 space-y-4">


                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Founder
                                                </p>

                                                <p className="mt-1 text-white font-medium">
                                                    {startup?.founderName || "Not provided"}
                                                </p>
                                            </div>



                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Industry
                                                </p>

                                                <span className="mt-2 inline-block rounded-full bg-[#00d3f2] px-4 py-1 text-sm font-semibold text-[#00142c]">
                                                    {startup?.industry}
                                                </span>
                                            </div>



                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Team Needed
                                                </p>

                                                <p className="mt-1 text-white">
                                                    {startup?.teamSize || "Not mentioned"}
                                                </p>
                                            </div>


                                        </div>


                                       

                                    </div>


                                </div>

                            ))
                        }

                    </div>


                </div>
            </section>

        </div>
    );
};

export default FeatureStartups;
