import { stripe } from '@/lib/stripe'
import axios from 'axios'
import { redirect } from 'next/navigation'

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
        return (
            <section id="success">
                <p className='text-white'>
                    We appreciate your business! A confirmation email will be sent to{' '}
                    {session.customer_details.email}. If you have any questions, please email{' '}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }
}