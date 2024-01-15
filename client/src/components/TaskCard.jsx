import { useTasks } from "../context/TaskProvider.jsx";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 rounded-lg shadow">
      <header className="flex justify-between">
        <h3 className="text-lg font-bold tracking-tight  text-gray-900 font-large">
          {task.title}
        </h3>
        <span className="hidden">{task.done == 1 ? "✅" : "❌"}</span>
      </header>
      <p className="text-lg text-gray-900 font-medium">{task.description}</p>
      <p className="my-2 text-xs font-medium text text-gray-900">
        {task.createdAt}
      </p>
      <div className="flex justify-end gap-x-1">
        <button
          className="bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-medium text-center text-white"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm font-medium text-center text-white"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 text-white px-2 py-1 hidden"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;