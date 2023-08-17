import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useActionList = () => {
  const { data, error, isLoading } = useSWR("/api/actionList", fetcher, {
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

export default useActionList;
