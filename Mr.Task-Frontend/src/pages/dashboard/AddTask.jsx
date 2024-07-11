import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddTask = () => {
  const [status, setStatus] = useState();
  const axiosSecure = useAxiosSecure();

  const taskStatus = ["To-Do", "In Progress", "Completed"];

  const handleAddTask = async (e) => {
    e.preventDefault();

    const taskName = e.target.taskName.value;
    const description = e.target.description.value;

    const task = {
      taskName,
      description,
      status,
    };

    const res = await axiosSecure.post("/tasks", task);
    if (res?.data?.insertedId) {
      toast.success("Successfully added  you task");
      form.reset();
    }
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <IoMdAdd className="text-lg text-red-600" /> Add Task
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle min"
      >
        <div className="modal-box">
          <form onSubmit={handleAddTask} className="space-y-2">
            <div>
              <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                className="px-2 py-1 border-none block"
              />
            </div>
            <textarea
              name="description"
              cols="40"
              rows="3"
              placeholder="Description"
              className="px-2 py-1  block border-2"
            ></textarea>
            {/* Select Task Status*/}
            <div className="flex gap-2">
              <label className="font-medium">Task Status :</label>
              <select
                onChange={(e) => {
                  setStatus(taskStatus.find((val) => val == e.target.value));
                }}
                className="border border-black px-1 rounded"
              >
                <option disabled>Select Status</option>
                {taskStatus.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="submit"
              value="Add Task"
              className="btn  bg-gradient-to-r from-sky-800 to-sky-500 text-white absolute right-24 bottom-6"
            />
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTask;
