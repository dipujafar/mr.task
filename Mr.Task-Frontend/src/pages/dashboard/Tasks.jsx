import { GoTasklist } from "react-icons/go";
import AddTask from "./AddTask";
const Tasks = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-semibold flex gap-2">
        Task <GoTasklist />
      </h1>
      <AddTask></AddTask>
    </div>
  );
};

export default Tasks;
