import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useRole = () => {
    const { data: session } = authClient.useSession()
    const userEmail = session?.user?.email

    const { data: role, isLoading: roleLoading } = useQuery({
        queryKey: ["role"],
        queryFn: async () => {
            const result = await axios.get(`https://venture-connect-server-kappa.vercel.app/role?email=${userEmail}`)
            return result.data?.role
        },
        enabled: userEmail ? true : false
    })

    return { role, roleLoading }
};

export default useRole;