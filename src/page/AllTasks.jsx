import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@base-ui-components/react/input";

import { Menu } from "@base-ui-components/react/menu";

import { TasksContext } from "../contexts/TaskContext";
import TaskTable from "../components/Table/TaskTable";
import { SelectRowContext } from "../contexts/SelectedRowContext";
import ReplayIcon from "@mui/icons-material/Replay";
import { Popover } from "@base-ui-components/react/popover";
import CircularProgress from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";
import { LinearProgress } from "@mui/material";

function AllTasks() {
  const { tasks, setTasks } = useContext(TasksContext);
  const [selectRow, setSelectRow] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [priority, setPriority] = useState("Priority");
  const [status, setStatus] = useState("Status");
  const [date, setDate] = useState(new Date());
  const [dominant, setDominant] = useState("");
  const[search,setSearch]=useState("");
  const renderCount = useRef(1);
  const dateRef = useRef(null);
  const priorityArr = ["No priority", "Low", "Medium", "High"];
  const statusArr = [
    "Beginning",
    "In Progress",
    "Near Complition",
    "Completed",
  ];

  function onHandleDelte() {
    if (selectRow.length > 0) {
      let newTask = tasks.filter((task) => !selectRow.includes(task.id));
      setTasks(newTask);
      localStorage.setItem("tasks", JSON.stringify(newTask));
    } else {
      setIsPopoverOpen(true);
      setTimeout(() => {
        setIsPopoverOpen(false);
      }, 3000);

      console.log("Select task");
    }
  }
  // useEffect(() => {
  //   console.log("dominat", dominant);
  //   if (renderCount.current !== 1) {
  //     console.log("change the table");
  //     let changeArr = [];
  //     if (priority === "High") {
  //       changeArr = priorityArr.reverse();
  //     } else if (priority === "Low") {
  //       changeArr = [...priorityArr.splice(1, 3), ...priorityArr.splice(0, 1)];
  //       console.log(changeArr);
  //     } else if (priority === "Medium") {
  //       changeArr = [
  //         ...priorityArr.splice(2, 2),
  //         ...priorityArr.splice(1, 1),
  //         ...priorityArr.splice(0, 1),
  //       ];
  //       console.log(changeArr);
  //     } else {
  //       changeArr = priorityArr;
  //     }
  //     let updatedTasks = [];
  //     if (dominant == "priority" && status == "Status") {
  //       for (let priority of changeArr) {
  //         tasks.map((task) => {
  //           if (task.priority === priority) {
  //             updatedTasks.push(task);
  //           }
  //         });
  //       }
  //     } else if (dominant == "priority" && status !== "Status") {
  //       tasks.map((task) => {
  //         if (
  //           task.priority == priority &&
  //           task.progress.toLowerCase() == status.toLowerCase()
  //         ) {
  //           updatedTasks.push(task);
  //         }
  //       });

  //       for (let priority2 of changeArr) {
  //         tasks.map((task) => {
  //           if (
  //             task.priority === priority2 &&
  //             task.priority !== priority &&
  //             task.status !== status
  //           ) {
  //             updatedTasks.push(task);
  //           }
  //         });
  //       }
  //     }
  //     setTasks(updatedTasks);
  //   }
  // }, [priority]);

  // useEffect(() => {
  //   console.log("dominat", dominant);
  //   let changeArr = [];
  //   if (renderCount.current !== 1) {
  //     if (status === "Beginning") {
  //       changeArr = statusArr;
  //     } else if (status === "Completed") {
  //       changeArr = statusArr.reverse();
  //     } else if (status === "In Progress") {
  //       changeArr = [...statusArr.splice(1, 3), ...statusArr.splice(0, 1)];
  //     } else if (status === "Near Complition") {
  //       changeArr = [
  //         ...statusArr.splice(2, 2),
  //         ...statusArr.splice(0, 2).reverse(),
  //       ];
  //     }
  //     let updatedTask = [];
  //     if (dominant == "status" && priority == "Priority") {
  //       for (let status of changeArr) {
  //         tasks.map((task) => {
  //           if (task.progress.toLowerCase() === status.toLowerCase()) {
  //             updatedTask.push(task);
  //           }
  //         });
  //       }
  //     } else if (dominant == "status" && priority !== "Priority") {
  //       tasks.map((task) => {
  //         if (
  //           task.priority == priority &&
  //           task.progress.toLowerCase() === status.toLowerCase()
  //         ) {
  //           updatedTask.push(task);
  //         }
  //       });
  //       for (let status2 of changeArr) {
  //         tasks.map((task) => {
  //           if (
  //             task.progress.toLowerCase() === status2.toLowerCase() &&
  //             task.priority !== priority &&
  //             task.progress.toLowerCase() !== status.toLowerCase()
  //           ) {
  //             updatedTask.push(task);
  //           }
  //         });
  //       }
  //     }
  //     setTasks(updatedTask);
  //   }
  // }, [status]);

  useEffect(() => {
    if (renderCount.current !== 1) {
      console.log("filter is change is table");
      console.log("dominant", dominant);
      const priorityOrderBase = ["No priority", "Low", "Medium", "High"];
      const statusOrderBase = [
        "Beginning",
        "In Progress",
        "Near Complition",
        "Completed",
      ];

      // priority order
      let priorityOrder = [...priorityOrderBase];
      if (priority === "High")
        priorityOrder = ["High", "Medium", "Low", "No priority"];
      else if (priority === "Medium")
        priorityOrder = ["Medium", "High", "Low", "No priority"];
      else if (priority === "Low")
        priorityOrder = ["Low", "Medium", "High", "No priority"];

      // status order
      let statusOrder = [...statusOrderBase];
      if (status === "Completed")
        statusOrder = [
          "Completed",
          "Near Complition",
          "In Progress",
          "Beginning",
        ];
      else if (status === "In Progress")
        statusOrder = [
          "In Progress",
          "Near Complition",
          "Completed",
          "Beginning",
        ];
      else if (status === "Near Complition")
        statusOrder = [
          "Near Complition",
          "Completed",
          "In Progress",
          "Beginning",
        ];
      let updatedTasks = [];
      let otherTask = [];
      if (dominant == "priority") {
        // console.log("inside priority condition",priority);
        // console.log("status inside priority condititon",status);

        if (status == "Status") {
          console.log("inside priority inside status");
          for (let priority of priorityOrder) {
            tasks.map((task) => {
              if (task.priority === priority) {
                updatedTasks.push(task);
              }
            });
          }
        } else {
          console.log("inside priority inside status chnage");
          for (let priority of priorityOrder) {
            tasks.map((task) => {
              if (
                task.progress.toLowerCase() === status.toLowerCase() &&
                task.priority === priority
              ) {
                updatedTasks.push(task);
              } else if (
                task.priority === priority &&
                task.progress.toLowerCase() !== status.toLowerCase()
              ) {
                otherTask.push(task);
              }
            });
          }
        }
      } else if (dominant == "status") {
        if (priority == "Priority") {
          for (let status of statusOrder) {
            tasks.map((task) => {
              if (task.progress.toLowerCase() === status.toLowerCase()) {
                updatedTasks.push(task);
              }
            });
          }
        } else {
          for (let status of statusOrder) {
            tasks.map((task) => {
              if (
                task.priority === priority &&
                task.progress.toLowerCase() === status.toLowerCase()
              ) {
                updatedTasks.push(task);
              } else if (
                task.progress.toLowerCase() === status.toLowerCase() &&
                task.priority !== priority
              ) {
                otherTask.push(task);
              }
            });
          }
        }
      }
      setTasks([...updatedTasks, ...otherTask]);
      console.log("updated task", updatedTasks);
      console.log("other task", otherTask);
    }
  }, [priority, status, dominant]);

  useEffect(() => {
    if (renderCount.current !== 1) {
      let st = status !== "Status" ? status : "";
      let pr = priority !== "Priority" ? priority : "";
      let newTasks = tasks.filter((task) => {
        if (st !== "" || pr !== "") {
          if (
            task.date === date.toLocaleDateString("en-CA") &&
            (task.priority === priority ||
              task.status.toLowerCase() === status.toLowerCase())
          ) {
            return task;
          }
        } else {
          if (task.date === date.toLocaleDateString("en-CA")) {
            return task;
          }
        }
      });
      console.log(newTasks);
      setTasks(newTasks);
    }
  }, [date]);

  function handleReset() {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }

  // useEffect(() => {
  //   if (renderCount.current !== 1) {
  //     let updatedTasks = [...tasks]; // start from current tasks

  //     // ----- Priority Sorting -----
  //     let priorityOrder = [];
  //     if (priority === "High") {
  //       priorityOrder = ["High", "Medium", "Low", "No priority"];
  //     } else if (priority === "Medium") {
  //       priorityOrder = ["Medium", "High", "Low", "No priority"];
  //     } else if (priority === "Low") {
  //       priorityOrder = ["Low", "Medium", "High", "No priority"];
  //     } else {
  //       priorityOrder = priorityArr; // default order
  //     }

  //     let prioritySorted = [];
  //     for (let p of priorityOrder) {
  //       updatedTasks.forEach((task) => {
  //         if (task.priority === p) {
  //           prioritySorted.push(task);
  //         }
  //       });
  //     }

  //     // ----- Status Sorting -----
  //     let statusOrder = [];
  //     if (status === "Beginning") {
  //       statusOrder = [
  //         "Beginning",
  //         "In Progress",
  //         "Near Complition",
  //         "Completed",
  //       ];
  //     } else if (status === "In Progress") {
  //       statusOrder = [
  //         "In Progress",
  //         "Near Complition",
  //         "Completed",
  //         "Beginning",
  //       ];
  //     } else if (status === "Near Complition") {
  //       statusOrder = [
  //         "Near Complition",
  //         "Completed",
  //         "In Progress",
  //         "Beginning",
  //       ];
  //     } else if (status === "Completed") {
  //       statusOrder = [
  //         "Completed",
  //         "Near Complition",
  //         "In Progress",
  //         "Beginning",
  //       ];
  //     } else {
  //       statusOrder = statusArr; // default
  //     }

  //     let finalSorted = [];
  //     for (let s of statusOrder) {
  //       prioritySorted.forEach((task) => {
  //         if (task.progress.toLowerCase() === s.toLowerCase()) {
  //           finalSorted.push(task);
  //         }
  //       });
  //     }

  //     setTasks(finalSorted);
  //   } else {
  //     renderCount.current += 1;
  //   }
  // }, [priority, status]);

  function handlePriorityChnage(e) {
    setPriority(e.target.innerText);
    renderCount.current++;
    setDominant("priority");
  }
  function handleProgressChnage(e) {
    setStatus(e.target.innerText);
    renderCount.current++;
    setDominant("status");
  }
  function handleSearch(){
    let currentTask=[];
    currentTask=tasks.filter((task)=>task.title===search)
    console.log(currentTask);
    setTasks(currentTask);
  }

  return (
    <div className="flex flex-col gap-5 px-10 py-8">
      <div className="flex gap-190 ">
        <h1 className="text-black text-[30px] font-bold">All Tasks</h1>
        <div className="border-2 h-8 w-[250px] rounded-[14px] border-gray-300 bg-white flex items-center justify-between pl-2">
          <IconButton onClick={handleSearch}><i className="fa-solid fa-magnifying-glass text-gray-400 text-[17px]"></i></IconButton>
          <Input
            className={" h-8 w-[210px]  outline-0 pr-2"}
            placeholder="Search tasks..."
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {tasks === undefined ? (
        <div>
          <CircularProgress enableTrackSlot size="3rem" />
        </div>
      ) : (
        <div className="flex border-2 border-gray-300 rounded-2xl items-center px-4 py-3 bg-white ">
          <div className="flex gap-4 items-center mr-3">
            <Menu.Root>
              <Menu.Trigger
                className={
                  "flex items-center  justify-center rounded-[12px] border-0 bg-gray-100 text-black w-[120px] h-[32px]"
                }
                disabled={tasks.length > 0 ? false : true}
              >
                {priority} <i className="fa-solid fa-caret-down"></i>
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner
                  className={
                    " mt-1 bg-gray-100 rounded-2xl flex flex-col items-center px-5 pt-1 "
                  }
                >
                  <Menu.Popup className={"w-[80px] flex flex-col gap-1"}>
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
            <Menu.Root>
              <Menu.Trigger
                className={
                  "flex items-center  justify-center rounded-[12px] border-0 bg-gray-100 text-black w-[200px] h-[32px]"
                }
                disabled={tasks.length > 0 ? false : true}
              >
                {status} <i className="fa-solid fa-caret-down"></i>
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner
                  className={
                    " mt-1 bg-gray-100 rounded-2xl flex flex-col items-center px-5 pt-1 "
                  }
                >
                  <Menu.Popup className={"w-[150px] flex flex-col gap-1"}>
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
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={"Select Date"}
                views={["year", "month", "day"]}
                slotProps={{
                  textField: {
                    sx: {
                      color: "#bbdefb",

                      fontSize: "10px",
                      width: "50px",
                      borderColor: "#gray",
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider> */}
            <div className="flex flex-col">
              <button
                className={
                  "flex items-center  justify-center rounded-[12px] border-0 bg-gray-100 text-black w-[190px] h-[32px]"
                }
                disabled={tasks.length > 0 ? false : true}
                onClick={() => {
                  dateRef.current.showPicker();
                  console.log("clicked");
                }}
              >
                {date.toLocaleDateString("en-CA")}{" "}
                <i className="fa-solid fa-caret-down"></i>
              </button>
              <input
                type="date"
                style={{ height: "0px", width: "0px" }}
                ref={dateRef}
                onChange={(e) => {
                  setDate(new Date(e.target.value));
                  renderCount.current++;
                }}
              />
            </div>
          </div>
          <IconButton
            // disabled={tasks.length > 0 ? false : true}
            onClick={handleReset}
          >
            <ReplayIcon />
          </IconButton>
          <div className="flex gap-2 ml-[30vw]">
            {/* <Button
            className="bg-red-100 py-2 px-5 rounded-xl text-red-700"
            onClick={onHandleDelte}
          >
            Delete
          </Button> */}
            <Popover.Root open={isPopoverOpen}>
              <Popover.Trigger
                className={"bg-red-200 py-2 px-5 rounded-xl text-red-700"}
                onClick={onHandleDelte}
                disabled={tasks.length > 0 ? false : true}
              >
                Delete
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner sideOffset={8} alignOffset={-40}>
                  <Popover.Popup className={"px-4 py-5 bg-red-100 rounded-2xl"}>
                    <Popover.Description
                      className={"font-semibold text-red-700"}
                    >
                      Select At least one task
                    </Popover.Description>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      )}
      <SelectRowContext value={{ selectRow, setSelectRow }}>
        <TaskTable tasks={tasks} setTasks={setTasks} />
      </SelectRowContext>
    </div>
  );
}

export default AllTasks;
