import { useContext, useState } from "react";
import { 
    getTasksRequest, 
    getTaskRequest, 
    createTaskRequest, 
    deleteTaskRequest, 
    updateTaskRequest, 
    toggleTaskDoneRequest } from '../api/tasks.api'
import { TaskContext } from "./taskContext";

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error('useTasks must be used within a TaskContextProvider');
    }
    return context;
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        const response = await getTasksRequest();
        setTasks(response.data);
    };

    const createTask = async (task) => {
        try {
            await createTaskRequest(task);
        } catch(error) {
            console.error(error);
        }
    };
 
    const deleteTask = async (id) => {
        try {
          const response = await deleteTaskRequest(id);
          setTasks(tasks.filter(task => task.id !== id));
        } catch(error) {
          console.error(error);
        }
    };

    const getTask = async (id) => {
        try {
          const response = await getTaskRequest(id);
          return response.data;
        } catch(error) {
          console.error(error);
        }
    };

    const updateTask = async (id, newFields) => {
        try {
          const response = await updateTaskRequest(id, newFields);
          return response.data;
        } catch(error) {
          console.error(error);
        }
    };

    const toggleTaskDone = async (id) => {
        try {
            const taskFound = tasks.find((task) => task.id === id);
            await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false);
            setTasks(
                tasks.map((task) =>
                    task.id ===id ? { ...task, done: !task.done } : task
                )
            );
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loadTasks, createTask, deleteTask, getTask, updateTask,toggleTaskDone }}>
            {children}
        </TaskContext.Provider>
    )
};