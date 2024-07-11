import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAllTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: allTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTask"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks`);
      return res?.data;
    },
  });

  return [allTasks, isLoading, refetch];
};

export default useAllTask;
