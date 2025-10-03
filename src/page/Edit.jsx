import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Input } from "@base-ui-components/react/input";
import { Menu } from "@base-ui-components/react/menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Progress } from "@base-ui-components/react";
import Button from "@mui/material/Button";
import SubTaskRow from "../components/Table/TableRow.jsx/SubTaskRow";
import { TasksContext } from "../contexts/TaskContext";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import Alert from "@mui/material/Alert";

function progress(prg) {
  if (prg.toLowerCase() === "beginning") {
    return 20;
  } else if (prg.toLowerCase() == "near complition") {
    return 80;
  } else if (prg.toLowerCase() === "in progress") {
    return 50;
  } else if (prg.toLowerCase() === "completed") {
    return 100;
  } else {
    return 0;
  }
}

export function Edit() {
  // const [priority, setPriority] = useState("Priority");
  // const [status, setStatus] = useState("Status");
  const { id } = useParams();
  const { tasks, setTasks } = useContext(TasksContext);
  const dateRef = useRef(null);
  const [task, setTask] = useState();
  const [date, setDate] = useState("");
  const [error, setError] = useState({
    title: false,
    description: false,
    isError: false,
  });
  const [errorMsg, seterrorMsg] = useState({
    title: "",
    description: "",
    date: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (tasks) {
      let [currentTask] = tasks.filter((task) => task.id == id);
      setTask(currentTask);
      setDate(new Date(currentTask.date).toLocaleDateString("en-CA"));
    }
  }, [tasks]);

  function handleCancel() {
    navigate("/all-tasks");
  }

  function handleEditSave() {
    // console.log(task);
    let isError = false;
    tasks.map((prevTask) => {
      if (prevTask.id == id) {
        prevTask.title = task.title;
        prevTask.description = task.description;
        prevTask.priority = task.priority;
        prevTask.progress = task.progress;
        prevTask.date = task.date;
        prevTask.subTask = task.subTask;
        
      }
    });
    console.log(task);
    for (let field in task) {
      console.log(task[field]);
          if (task[field] === "" &&(field==="title"||field==="description")) {
            error[field] = true;
            errorMsg[field] = `${field} is required`;
            isError = true;
          }
        }
    setError(error);
    seterrorMsg(errorMsg);
    if (isError === false) {
      setTasks(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      navigate("/all-tasks");
    }
  }

  function handlePriorityChnage(e) {
    setTask({ ...task, priority: e.target.innerText });
  }
  function handleProgressChnage(e) {
    setTask({ ...task, progress: e.target.innerText });
  }
  return (
    <div className="flex justify-center pl-15 pt-8">
      {task !== undefined ? (
        <div className="px-6 py-6 flex flex-col  bg-white rounded-2xl gap-4">
          <h1 className="text-2xl font-bold">Task Details</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-500 text-[18px] font-semibold">
                Task Title
              </h4>
              <Input
                value={task !== undefined ? task.title : ""}
                placeholder="Task Title"
                className={
                  " text-[18px] border-2 border-gray-400 rounded-[13px] w-[1070px]  px-4 py-2 "
                }
                onValueChange={(value) => {
                  task.title = value;
                  setTask({ ...task, title: value });
                }}
              />
              {error.title && (
                <Alert severity="error" variant="outlined">
                  {errorMsg.title}
                </Alert>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-500 text-[18px] font-semibold">
                Description
              </h4>

              <textarea
                name=""
                id=""
                className={
                  " text-[18px] border-2 border-gray-400 rounded-[13px] w-[1070px] h-[150px]  px-3 py-2"
                }
                defaultValue={task !== undefined ? task.description : ""}
                onChange={(e) => {
                  task.description = e.target.value;
                  setTask({ ...task, description: e.target.value });
                }}
              ></textarea>
              {error.description && (
                <Alert severity="error" variant="outlined">
                  {errorMsg.description}
                </Alert>
              )}
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col gap-2">
                <h4 className="text-gray-500 text-[18px] font-semibold">
                  Due Date
                </h4>
              
                <div className="flex flex-col">
                  <button
                    className={
                      "flex items-center  justify-between rounded-[12px] px-3  bg-gray-100 text-black w-[500px] h-[45px] border-2 border-gray-300"
                    }
                    onClick={() => {
                      dateRef.current.showPicker();
                      console.log("clicked");
                    }}
                  >
                    {date} <CalendarMonthIcon></CalendarMonthIcon>
                  </button>
                  <input
                    type="date"
                    style={{ height: "0px", width: "0px" }}
                    ref={dateRef}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setDate(e.target.value);
                      setTask({
                        ...task,
                        date: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-gray-500 text-[18px] font-semibold">
                  Priority
                </h4>
                <Menu.Root>
                  <Menu.Trigger
                    className={
                      "flex items-center  justify-between px-4 rounded-[12px]  bg-gray-100 border-2 border-gray-300 text-black w-[500px] h-[45px]"
                    }
                  >
                    {task !== undefined ? task.priority : ""}{" "}
                    <i className="fa-solid fa-caret-down"></i>
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner
                      className={
                        " mt-1 bg-gray-100 rounded-2xl flex flex-col items-center px-5 pt-1 "
                      }
                    >
                      <Menu.Popup className={"w-[450px] flex flex-col gap-1"}>
                        <Menu.Item
                          className={
                            "self-center hover:font-semibold hover:cursor-pointer"
                          }
                          onClick={handlePriorityChnage}
                        >
                          High
                        </Menu.Item>

                        <Menu.Item
                          className={
                            "self-center hover:font-semibold hover:cursor-pointer"
                          }
                          onClick={handlePriorityChnage}
                        >
                          Low
                        </Menu.Item>

                        <Menu.Item
                          className={
                            "self-center hover:font-semibold hover:cursor-pointer"
                          }
                          onClick={handlePriorityChnage}
                        >
                          Medium
                        </Menu.Item>

                        <Menu.Item
                          className={
                            "self-center hover:font-semibold hover:cursor-pointer"
                          }
                          onClick={handlePriorityChnage}
                        >
                          No priority
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-500 text-[18px] font-semibold">{}</h4>
              <Menu.Root>
                <Menu.Trigger
                  className={
                    "flex items-center  justify-between px-4 rounded-[12px]  bg-gray-100 border-2 border-gray-300 text-black w-[1080px] h-[45px]"
                  }
                >
                  {task !== undefined ? task.progress : ""}{" "}
                  {task !== undefined ? progress(task.progress) : progress("")}%{" "}
                  <i className="fa-solid fa-caret-down"></i>
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner
                    className={
                      " mt-1 bg-gray-100 rounded-2xl flex flex-col items-center px-5 pt-1 "
                    }
                  >
                    <Menu.Popup className={"w-[980px] flex flex-col gap-1"}>
                      <Menu.Item
                        className={
                          "self-center hover:font-semibold hover:cursor-pointer"
                        }
                        onClick={handleProgressChnage}
                      >
                        Near Complition
                      </Menu.Item>

                      <Menu.Item
                        className={
                          "self-center hover:font-semibold hover:cursor-pointer"
                        }
                        onClick={handleProgressChnage}
                      >
                        In Progress
                      </Menu.Item>

                      <Menu.Item
                        className={
                          "self-center hover:font-semibold hover:cursor-pointer"
                        }
                        onClick={handleProgressChnage}
                      >
                        Completed
                      </Menu.Item>

                      <Menu.Item
                        className={
                          "self-center hover:font-semibold hover:cursor-pointer"
                        }
                        onClick={handleProgressChnage}
                      >
                        Beginning
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
              <Progress.Root
                className={"w-[1080px]"}
                value={
                  task !== undefined ? progress(task.progress) : progress("")
                }
              >
                <Progress.Track
                  className={"overflow-hidden h-3 rounded-[5px] bg-gray-200"}
                >
                  <Progress.Indicator className={"block bg-[#14F3DC]"} />
                </Progress.Track>
              </Progress.Root>
            </div>
            <div className="flex flex-col mt-3 gap-3">
              <h2 className="text-xl ">Subtaks</h2>
              {task.subTask.length > 0 ? (
                <ul className="flex flex-col gap-4">
                  {task.subTask.map((sub) => (
                    <SubTaskRow
                      subTask={sub}
                      task={task}
                      setTask={setTask}
                      key={sub.id}
                    />
                  ))}
                </ul>
              ) : (
                <div>No sub task</div>
              )}
            </div>
          </div>
          <div className=" self-end flex gap-3">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#E5E7EB",
                borderRadius: "20px",
                padding: "8px 25px",
                color: "#374151",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
         
            <AlertDialog.Root>
              <AlertDialog.Trigger className="flex h-10 items-center justify-center rounded-4xl border border-gray-200 bg-[#14F3DC] px-3.5 text-base font-medium text-[#FFFFFF] select-none hover:bg-[#0D9488]  focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                Save Draft
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
                <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
                  <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
                    Save Edit
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mb-6 text-base text-gray-600">
                    Are you sure you want to save edit ?
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4">
                    <AlertDialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-red-800 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                      Cancel
                    </AlertDialog.Close>
                    <AlertDialog.Close
                      className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-[#0D9488] select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
                      onClick={handleEditSave}
                    >
                      Save
                    </AlertDialog.Close>
                  </div>
                </AlertDialog.Popup>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
