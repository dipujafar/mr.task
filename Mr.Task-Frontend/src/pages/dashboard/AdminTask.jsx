import { toast } from "react-toastify";
import useAllTask from "../../hooks/useAllTask";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddTask from "./AddTask";
import { GoTasklist } from "react-icons/go";
import Swal from "sweetalert2";

const AdminTask = () => {
  const [allTasks, isLoading, refetch] = useAllTask();
  const tasksRev = [...allTasks]?.reverse() || [];
  const taskStatus = ["To-Do", "In Progress", "Completed"];
  const axiosSecure = useAxiosSecure();

  const handleChangeStatus = async (status, id) => {
    const res = await axiosSecure.put(`/tasks/${id}`, { status });
    if (res.data.modifiedCount) {
      toast.success("Update the task status");
      refetch();
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold flex gap-2 mb-2">
        Task <GoTasklist />
      </h1>
      <AddTask refetch={refetch}></AddTask>

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
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default AdminTask;
