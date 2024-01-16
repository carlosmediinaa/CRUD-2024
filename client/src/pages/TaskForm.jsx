import { Formik, Form } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);
  return (
    <>
      <h2 className="mb-8 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  text-center">
        {params.id ? "Edit Task" : " New Task"}
      </h2>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }
          navigate("/");
          actions.resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="w-full md:w-3/6 mx-auto">
            <div className="mb-6">
              <label className="block text-md text-gray-900">
                <span className="block text-md text-gray-900 font-medium">Tasks Title</span>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mt-2"
                type="text"
                name="title"
                placeholder="Write a task..."
                onChange={handleChange}
                value={values.title}
              />
              </label>
              
            </div>
            <div className="mb-6">
              <label>
                <span className="block text-md text-gray-900 font-medium">Description</span>
                <textarea
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mt-2"
                name="description"
                rows="4"
                placeholder="Write a description..."
                onChange={handleChange}
                value={values.description}
              />
              </label>
              
            </div>
            <button
              className="flex justify-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full mx-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default TaskForm;