"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

const sampleTransactions = [
    {
        _id: "6a4275983506646fa28f7207",
        email: "ventureconnectfounder@gmail.com",
        amount: 900,
        status: "complete",
        createdAt: "2026-06-29T15:30:01.286Z",
    },
];

const ViewTransaction = () => {
    const { data: transactions, isLoading, isError } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const result = await axios.get("https://venture-connect-server-kappa.vercel.app/payments");
            return result.data;
        }
    });

    const displayTransactions = useMemo(() => {
        if (Array.isArray(transactions) && transactions.length) {
            return transactions;
        }

        if (transactions && !Array.isArray(transactions)) {
            return [transactions];
        }

        return sampleTransactions;
    }, [transactions]);

    const totalAmount = displayTransactions.reduce((total, transaction) => {
        return total + Number(transaction?.amount || 0);
    }, 0);

    const completeTransactions = displayTransactions.filter((transaction) => {
        return transaction?.status === "complete";
    }).length;

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(date));
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(Number(amount || 0));
    };

    return (
        <div className='space-y-6 text-white'>
            <div>
                <h1 className='text-3xl font-semibold'>View Transactions</h1>
                <p className='mt-1 text-sm text-gray-400'>Review founder payments and checkout history.</p>
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Total Revenue</p>
                    <h2 className='mt-2 text-3xl font-semibold'>{formatAmount(totalAmount)}</h2>
                </div>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Transactions</p>
                    <h2 className='mt-2 text-3xl font-semibold'>{displayTransactions.length}</h2>
                </div>
                <div className='border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm text-gray-400'>Completed</p>
                    <h2 className='mt-2 text-3xl font-semibold'>{completeTransactions}</h2>
                </div>
            </div>

            {isLoading && <div className='flex justify-center p-8'><span className="loading loading-spinner text-success"></span></div>}
            {isError && <p className='text-sm text-amber-300'>Showing sample transaction data because the payments API is unavailable.</p>}

            <div className='overflow-x-auto border border-white/10'>
                <table className='table'>
                    <thead>
                        <tr className='border-white/10 text-gray-300'>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayTransactions.map((transaction) => (
                                <tr key={transaction?._id || transaction?.email} className='border-white/10'>
                                    <td>
                                        <span className='font-mono text-xs text-gray-300'>{transaction?._id}</span>
                                    </td>
                                    <td>{transaction?.email || "No email"}</td>
                                    <td className='font-semibold'>{formatAmount(transaction?.amount)}</td>
                                    <td>
                                        <span className={`badge capitalize ${transaction?.status === "complete" ? "badge-success" : "badge-warning"}`}>
                                            {transaction?.status || "pending"}
                                        </span>
                                    </td>
                                    <td>{formatDate(transaction?.createdAt)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTransaction;
