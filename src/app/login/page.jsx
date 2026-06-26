"use client";

import Link from "next/link";
import { ArrowLeft, Mail, User, Chrome } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form) // entries
        const newFormData = Object.fromEntries(formData)

        const { data: result, error } = await authClient.signIn.email(newFormData)
        if (result) {
            router.push("/")
        }


        console.log({ result, error })


    }
    const handleGoogleSignIn = async () => {

        await authClient.signIn.social({
            provider: "google"
        })
    }




    return (
        <div className="min-h-screen dark-bg flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#00d3f2] mb-6 transition">
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>


                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00142c]">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Login to continue with VentureConnect</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5">


                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>

                        <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-[#00d3f2]">
                            <User size={20} className="text-gray-400" />

                            <input name="email" type="text" placeholder="Enter your name" className="w-full px-3 py-3 outline-none" />
                        </div>
                    </div>


                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>

                        <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-[#00d3f2]">
                            <Mail size={20} className="text-gray-400" />

                            <input name="password" type="password" placeholder="Enter your email" className="w-full px-3 py-3 outline-none" />
                        </div>
                    </div>


                    <button type="submit" className="w-full bg-[#00142c] text-white py-3 rounded-lg hover:bg-[#002044] transition">
                        Login
                    </button>


                </form>


                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>


                <button onClick={handleGoogleSignIn} className="w-full border border-gray-200 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                    <FcGoogle />
                    Continue with Google
                </button>

                <h1 className="text-center mt-5 text-sm sm:text-base">

                    Don&apos;t have an account ?

                    <Link href={"/role"}

                        className="text-cyan-500 ml-1"
                    >
                        Register
                    </Link>



                </h1>



            </div>

        </div>
    );
}