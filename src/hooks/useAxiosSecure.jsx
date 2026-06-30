// import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useEffect } from "react";

const instance = axios.create()
const useAxiosSecure = () => {

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(async (config) => {
            const { data } = await authClient.token()
            // console.log(token)
            config.headers.Authorization = `Bearer ${data.token}`
            return config
        }, (error) => {
            return Promise.reject(error)
        })
        return () => {
            instance.interceptors.request.eject(requestInterceptor)
        }
    }, [])


    return instance
};

export default useAxiosSecure;