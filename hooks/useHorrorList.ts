import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useHorrorLists = () => {
  const { data, error, isLoading } = useSWR("/api/horrorList", fetcher, {
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

export default useHorrorLists;