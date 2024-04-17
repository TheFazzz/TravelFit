import { useRouter } from "expo-router";
import React, {useEffect} from "react";

export default function index() {
    const router = useRouter()
    const featuredGymId = 6

    useEffect(() => {
        router.replace({
            pathname: '/home/gymPage',
            params: {id: featuredGymId}
        })
    }, [])

    return(
    <>
    
    </>
    )
}