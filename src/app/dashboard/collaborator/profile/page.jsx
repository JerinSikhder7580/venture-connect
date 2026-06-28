import React from 'react';

const CollaboratorProfilePage = () => {
    return (
        <div className='min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl '>
                <div className='mb-8'>
                    <p className='text-sm font-medium uppercase tracking-wide text-cyan-300'>Collaborator Profile</p>
                    <h1 className='mt-2 text-3xl font-bold text-white'>Update your profile</h1>
                    <p className='mt-2 max-w-2xl text-sm text-gray-300'>
                        Keep your public collaborator details polished for founders and startup teams.
                    </p>
                </div>

                <form className='rounded-2xl border  border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8'>
                    <div className='mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center'>
                        <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-3xl font-bold text-cyan-200'>
                            VC
                        </div>

                        <div>
                            <h2 className='text-xl font-semibold text-white'>Profile information</h2>
                            <p className='mt-1 text-sm text-gray-300'>
                                Add the details that describe your expertise and availability.
                            </p>
                        </div>
                    </div>

                    <div className='grid gap-6'>
                        <div>
                            <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-200'>
                                Name
                            </label>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Enter your full name'
                                className='w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20'
                            />
                        </div>

                        <div>
                            <label htmlFor='image' className='mb-2 block text-sm font-medium text-gray-200'>
                                Image URL
                            </label>
                            <input
                                id='image'
                                name='image'
                                type='url'
                                placeholder='https://example.com/profile-photo.jpg'
                                className='w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20'
                            />
                        </div>

                        <div>
                            <label htmlFor='skill' className='mb-2 block text-sm font-medium text-gray-200'>
                                Skill
                            </label>
                            <input
                                id='skill'
                                name='skill'
                                type='text'
                                placeholder='Product Design, React, Marketing, Finance'
                                className='w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20'
                            />
                        </div>

                        <div>
                            <label htmlFor='bio' className='mb-2 block text-sm font-medium text-gray-200'>
                                Bio
                            </label>
                            <textarea
                                id='bio'
                                name='bio'
                                rows='5'
                                placeholder='Write a short bio about your experience and what kind of startup work you want to join.'
                                className='w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20'
                            ></textarea>
                        </div>
                    </div>

                    <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                        <button
                            type='button'
                            className='rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/30 hover:bg-white/10'
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            className='rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CollaboratorProfilePage;
