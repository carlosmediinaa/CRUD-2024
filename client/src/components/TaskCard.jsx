import { useTasks } from "../context/TaskProvider.jsx";
import { useNavigate } from "react-router-dom";
import IconCheck from "./icons/IconCheck.jsx";
import IconTrash from "./icons/IconTrash.jsx";
import IconEdit from "./icons/IconEdit.jsx";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  const doneClass = (task.done == 1) ? "bg-gray-100 rounded-lg" : "bg-white rounded-lg";
  const checkClass = (task.done == 1) ? "stroke-green-500 hover:scale-105" : "stroke-gray-400 hover:scale-105";

  return (
    <div className={doneClass}>
        <div className="block rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <header className="flex justify-between">
          <h3 className="text-lg font-bold tracking-tight  text-gray-900 font-large">
            {task.title}
          </h3>
          <button
            className=""
            onClick={() => handleDone(task.done)}
          >
            <IconCheck className={checkClass}/> 
          </button>
        </header>
        <p className="text-md text-gray-900">{task.description}</p>
        <footer className="flex justify-between gap-x-1">
          <div>
            <p className="my-2 text-xs font-bold text text-gray-700">
              {task.createdAt}
            </p>
          </div>
          <div>
            <button
              
              onClick={() => deleteTask(task.id)}
            >
              <IconTrash className="stroke-red-500 ml-1 hover:scale-105"/>
            </button>
            <button
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              <IconEdit className="stroke-blue-500 ml-1 hover:scale-105"/>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TaskCard;