import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userTask"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user?.email}`);
      return res?.data;
    },
  });

  return [tasks, isLoading, refetch];
};

export default useUserTask;
