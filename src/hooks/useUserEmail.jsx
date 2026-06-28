import { authClient } from '@/lib/auth-client';

const useUserEmail = () => {
    const { data: session } = authClient.useSession()
    const userEmail = session?.user?.email
    return userEmail
};

export default useUserEmail;