import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { authClient } from '@/lib/auth-client'

export async function proxy(request) {
    const session = await authClient.api.getSession({
        headers: await headers()
    })
    console.log(session)
    // session === user

    if (session) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
}



export const config = {
    matcher: [
        // "/dashboard"
         "/profile",],
}
// 