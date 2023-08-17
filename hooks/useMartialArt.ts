import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMartial = () => {
  const { data, error, isLoading } = useSWR("/api/martialArt", fetcher, {
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

export default useMartial;