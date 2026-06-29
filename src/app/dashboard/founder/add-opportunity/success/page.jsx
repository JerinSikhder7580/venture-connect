import { stripe } from '@/lib/stripe'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, CreditCard, Mail, ReceiptText } from 'lucide-react'
import { motion } from 'motion/react-client'

// import { stripe } from '../../lib/stripe'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    // const {
    //     status,
    //     customer_details: { email: customerEmail }
    // } = await stripe.checkout.sessions.retrieve(session_id, {
    //     expand: ['line_items', 'payment_intent']
    // })

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })
    console.log(session)

    if (session.status === 'open') {
        return redirect('/')
    }
    console.log(session_id)
    if (session.status === 'complete') {
        const payments = {
            email: session.customer_email,
            amount: session.amount_total,

        }
        await axios.post("http://localhost:8000/payments", payments)

        const amount = new Intl.NumberFormat("en", {
            style: "currency",
            currency: session.currency || "usd",
        }).format(Number(session.amount_total || 0) / 100)

        const paidAt = session.created
            ? new Intl.DateTimeFormat("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }).format(new Date(session.created * 1000))
            : "Not available"

        return (
            <section id="success" className="min-h-screen bg-[#00142c] px-4 py-12 text-white sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-cyan-400/30 bg-white/10 shadow-2xl shadow-cyan-950/30"
                >
                    <div className="border-b border-white/10 p-6 text-center sm:p-8">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                            <CheckCircle2 size={46} />
                        </div>
                        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                            Payment successful
                        </p>
                        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
                            Premium upgrade complete
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 md:text-base">
                            We appreciate your business. A confirmation email will be sent to {session.customer_details.email}.
                        </p>
                    </div>

                    <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
                        <div className="border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center gap-3 text-cyan-300">
                                <CreditCard size={20} />
                                <p className="text-sm font-semibold">Amount Paid</p>
                            </div>
                            <h2 className="mt-3 text-3xl font-bold">{amount}</h2>
                        </div>

                        <div className="border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center gap-3 text-cyan-300">
                                <ReceiptText size={20} />
                                <p className="text-sm font-semibold">Session Status</p>
                            </div>
                            <h2 className="mt-3 text-3xl font-bold capitalize">{session.status}</h2>
                        </div>

                        <div className="border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center gap-3 text-cyan-300">
                                <Mail size={20} />
                                <p className="text-sm font-semibold">Payment Status</p>
                            </div>
                            <h2 className="mt-3 text-3xl font-bold capitalize">{session.payment_status}</h2>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-white/10 p-6 sm:p-8">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-400">Customer Email</p>
                                <p className="mt-1 break-all font-semibold">{session.customer_details.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Paid At</p>
                                <p className="mt-1 font-semibold">{paidAt}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-400">Session ID</p>
                                <p className="mt-1 break-all font-mono text-sm text-gray-200">{session.id}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                            <Link href="/dashboard/founder/add-opportunity" className="btn border-none bg-cyan-400 text-[#00142c] hover:bg-cyan-300">
                                Post Opportunity
                            </Link>
                            <Link href="/dashboard/founder/overview" className="btn border border-white/20 bg-white/10 text-white hover:bg-white/20">
                                Founder Overview
                            </Link>
                            <a href="mailto:orders@example.com" className="btn border border-emerald-400/40 bg-transparent text-emerald-300 hover:bg-emerald-400 hover:text-[#00142c]">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        )
    }
}
