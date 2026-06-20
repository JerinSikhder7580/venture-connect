"use client";

import { Button, Card, Form } from '@heroui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);

    }

    return (
        <div className='dark-bg'>

            <div className='p-8'>


                <Card className='bg-white border max-w-2xl mx-auto'>
                    <h1 className='text-3xl font-bold text-center'>Create Account</h1>
                    <p className='text-center text-gray-500 font-semibold text-2xl'>Join Venture Connect Today</p>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className='space-y-3'>

                        <div>
                            <label>Full Name</label>
                            <input type="text"
                                id='name'
                                {...register("name", { required: "Name is required" })}
                                placeholder='Enter your name'
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#00d3f2]'

                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}

                        </div>



                        <div>
                            <label>Email</label>
                            <input type="email"
                                id='email'

                                {...register("email", { required: "Email is required" })}

                                placeholder='Enter your Email'
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#00d3f2]'

                            />

                        </div>



                        <div>
                            <label>Profile Image</label>
                            <input type="file"
                                id='image'

                                {...register("image", { required: "Image is required" })}

                                accept='image/*'
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#00d3f2]'

                            />

                        </div>


                        <div>
                            <label>Select Role</label>
                            <div className='grid grid-cols-2 gap-2 '>
                                <div className='border p-3 border-gray-200'>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Founder"
                                            {...register("role", { required: "Role is required" })}
                                        />
                                        Founder
                                    </label>
                                </div>
                                <div className='border p-3 border-gray-200'>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Collaborator"
                                            {...register("role", { required: "Role is required" })}
                                        />
                                        Collaborator
                                    </label>
                                </div>

                            </div>

                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password"
                                id='password'

                                placeholder='enter your password here'
                                {...register("password", { required: "Password is required", maxLength: 12, minLength: 6 })}

                                accept='image/*'
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#00d3f2]'

                            />
                            <ul className='list-disc ml-5 text-sm text-gray-500 mt-3'>
                                <li>Minimum 6 characters</li>
                                <li>At least 1 uppercase letter</li>
                                <li>At least 1 lowercase letter</li>

                            </ul>

                        </div>

                        <Button
                            type='submit'
                            className="w-full dark-bg py-5"
                        >Create Account</Button>













                    </form>
                </Card>
            </div>


        </div>
    );
};

// export default RegisterPage;