import useSWR  from "swr";
import fetcher from "@/lib/fetcher";


const useNotification = () => {

    const {data, error, isLoading} = useSWR("/api/notification", fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading
    }
}

export default useNotification;