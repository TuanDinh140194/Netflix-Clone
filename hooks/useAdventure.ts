import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAdventures = () => {
  const { data, error, isLoading } = useSWR("/api/adventures", fetcher, {
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

export default useAdventures;
