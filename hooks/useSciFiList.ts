import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useSciFiList = () => {
  const { data, error, isLoading } = useSWR("/api/scifiList", fetcher, {
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

export default useSciFiList;
