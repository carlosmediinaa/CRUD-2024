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
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
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
          <Form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-md text-gray-900">
                Tasks Title
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
                type="text"
                name="title"
                placeholder="Write a task..."
                onChange={handleChange}
                value={values.title}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md text-gray-900">
                Description
              </label>
              <textarea
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                name="description"
                rows="4"
                placeholder="Write a description..."
                onChange={handleChange}
                value={values.description}
              />
            </div>
            <button
              className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
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