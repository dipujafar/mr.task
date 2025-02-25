import { GoTasklist } from "react-icons/go";
import AddTask from "./AddTask";
import useUserTask from "../../hooks/userUserTask";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Tasks = () => {
  const [tasks, isLoading, refetch] = useUserTask();
  const tasksRev = [...tasks]?.reverse() || [];
  const axiosSecure = useAxiosSecure();

  const taskStatus = ["To-Do", "In Progress", "Completed"];

  const handleChangeStatus = async (status, id) => {
    const res = await axiosSecure.put(`/tasks/${id}`, { status });
    if (res.data.modifiedCount) {
      toast.success("Update the task status");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-sky-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-semibold flex gap-2">
        Task <GoTasklist />
      </h1>
      <AddTask refetch={refetch}></AddTask>

      {/* all task  */}
      {
        <div className="mt-5 space-y-5">
          {tasksRev?.map((task) => (
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-medium">{task?.taskName}</h3>
                <p>{task?.description}</p>
              </div>
              <div className="flex gap-2 items-center">
                <h3>{task?.status}</h3>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => {
                      handleChangeStatus(
                        taskStatus.find((val) => val == e.target.value),
                        task?._id
                      );
                    }}
                    className="border border-black px-1 rounded"
                  >
                    <option disabled>Change Status</option>
                    {taskStatus.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      <div></div>
    </div>
  );
};

export default Tasks;
