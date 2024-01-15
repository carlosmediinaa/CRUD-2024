import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import Page404 from "./pages/Page404";
import NavBar from "./components/NavBar";
import { TaskContextProvider } from "./context/TaskProvider";

function App() {
  return (
    <div className="bg-gray-200 h-screen">
      <NavBar />
      <div className="container mx-auto p-4 max-w-screen-xl ">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App;