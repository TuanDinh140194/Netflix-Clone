import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useRomance = () => {
  const { data, error, isLoading } = useSWR("/api/romanceList", fetcher, {
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

export default useRomance;