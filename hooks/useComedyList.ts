import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useComedy = () => {
  const { data, error, isLoading } = useSWR("/api/comedyList", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useComedy;