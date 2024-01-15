import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import NoTasks from "../components/NoTasks";
import { useTasks } from "../context/TaskProvider";

function TasksPage() {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0) return <NoTasks />;

    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <>
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        Tasks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {renderMain()}
      </div>
    </>
  );
}

export default TasksPage;