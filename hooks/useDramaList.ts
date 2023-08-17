import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useDrama = () => {
  const { data, error, isLoading } = useSWR("/api/dramaList", fetcher, {
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

export default useDrama;