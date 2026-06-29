"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = ({children}) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-dvh flex flex-col overflow-x-hidden dark">


                <Navbar />
                <div className="flex-1 min-w-0">

                    {children}
                </div>
                <Footer />
            </div>

        </QueryClientProvider>

    );
};

export default Root;
