import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./page/HomePage";
import Layout from "./Layout/Layout";
import SideBar from "./components/SideBar";
import AppRoutes from "./Routes/AppRoutes";
import { TasksContext } from "./contexts/TaskContext";
import { BrowserRouter } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  const [tasks, setTasks] = useState();
  useEffect(() => {
    let storgeTask = localStorage.getItem("tasks");

    if (storgeTask) {
      setTasks(JSON.parse(storgeTask));
    } else {
      setTasks([]);
    }
  }, []);
  return (
    <>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Layout>
          <BrowserRouter>
            <SideBar />
            <AppRoutes />
          </BrowserRouter>
        </Layout>
      </TasksContext.Provider>
    </>
  );
}

export default App;
