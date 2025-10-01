import { React, useContext, useEffect } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,

    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

const badgeStyle = {
  Low: {
    bg: "#DCFCE7",
    txtColor: "#15803D",
  },
  High: {
    bg: "#FEE2E2",
    txtColor: "#B91C1C",
  },
  Medium: {
    bg: "#FEF9C3",
    txtColor: "#CA8A04",
  },
  "No priority": {
    bg: "#E5E7EB",
    txtColor: "#374151",
  },
};

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { TasksContext } from "../contexts/TaskContext";
import { Progress } from "@base-ui-components/react";
import { useNavigate } from "react-router";

export default function Inbox() {
  const [toggle, setToggle] = useState("daily");
  const { tasks, setTasks } = useContext(TasksContext);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [current, setCurrent] = useState(undefined);
  const [futureTask, setFutureTask] = useState(undefined);
  const navigate = useNavigate();

  function handleChecked(id, progress) {
    let funcProgress = "Beginning";
    if (progress !== "Completed") {
      funcProgress = "Completed";
    }

    let currentTask = [];
    tasks.map((task) => {
      if (task.id === id) {
        task.progress = funcProgress;
      }
      currentTask.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(currentTask));
    setTasks(currentTask);
  }

  function handleDelete(id) {
    // console.log(id,"from delete");
    let currentTask = tasks.filter((task) => task.id !== id);
    setTasks(currentTask);
    localStorage.setItem("tasks", JSON.stringify(currentTask));
  }
  useEffect(() => {
    if (tasks !== undefined) {
      let currentDate = new Date();
      const startOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      );
      const endOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() + 6)
      );
      currentDate = new Date();
      let updatedTask = [];
      if (toggle === "daily") {
        console.log("daily");
        tasks.map((task) => {
          if (task.date === currentDate.toLocaleDateString("en-CA")) {
            updatedTask.push(task);
          }
        });
      } else if (toggle == "weekly") {
        console.log("weekly");
        tasks.map((task) => {
          if (
            new Date(task.date) >= startOfWeek &&
            new Date(task.date) <= endOfWeek
          ) {
            updatedTask.push(task);
          }
        });
      }
      setCurrent(updatedTask);
      // setCurrent([]);
    }
  }, [toggle, tasks]);
  useEffect(() => {
    console.log(current, "current");
    setTotal((prv) => 0);
    setOverdue((prv) => 0);
    setCompleted((prv) => 0);
    setPending((prv) => 0);
    if (current !== undefined) {
      setTotal(current.length);
      current.map((task) => {
        if (new Date() > new Date(task.date)) {
          setOverdue((prv) => prv + 1);
        }
        if (task.progress.toLowerCase() === "completed") {
          console.log("completed");
          setCompleted((prv) => prv + 1);
        } else {
          console.log("pending");
          setPending((prv) => prv + 1);
        }
      });
    }
  }, [current, tasks]);

  useEffect(() => {
    if (tasks !== undefined) {
      let futTask = [];
      let count = 0;
      for (let task of tasks) {
        if (
          new Date(task.date).setHours(0, 0, 0, 0) >
          new Date().setHours(0, 0, 0, 0)
        ) {
          futTask.push(task);
          count++;
        }
        if (count === 3) {
          break;
        }
      }
      // console.log(futTask);
      setFutureTask(futTask);
    }
  }, [current, tasks]);
  function handleToggle(event, newToggle) {
    setToggle(newToggle);
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "40px 50px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" component="h5" sx={{ fontWeight: 600 }}>
          Inbox
        </Typography>
        <StyledToggleButtonGroup
          className="bg-gray-200 rounded-xl h-10"
          value={toggle}
          color="success"
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
          Quick States / Overview
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 250px 50px 20px",
              backgroundColor: "white",
              borderRadius: "15px",
              gap: 2,
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "gray" }}
            >
              Total Tasks
            </Typography>
            <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
              {total}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 220px 50px 20px",
              backgroundColor: "white",
              borderRadius: "15px",
              gap: 2,
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "gray" }}
            >
              Completed vs Pending
            </Typography>
            <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
              {completed}/{pending}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 250px 50px 20px",
              backgroundColor: "white",
              borderRadius: "15px",
              gap: 2,
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "gray" }}
            >
              Overdue Tasks
            </Typography>
            <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
              {overdue}
            </Typography>
            {overdue>0&&<Chip
                        label={"Overdue"}
                        sx={{
                          backgroundColor: badgeStyle["High"].bg,
                          color: badgeStyle["High"].txtColor,
                          width:"80px",
                          fontWeight:600
                        }}
                      />}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: 500 }}>
              Task Completed
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "gray" }}
            >
              {current && Math.floor((completed / current.length) * 100)}%
            </Typography>
          </Box>
          <Progress.Root
            className={"w-full"}
            value={current && Math.floor((completed / current.length) * 100)}
          >
            <Progress.Track
              className={"overflow-hidden h-3 rounded-[5px] bg-gray-200"}
            >
              <Progress.Indicator className={"block bg-[#14F3DC]"} />
            </Progress.Track>
          </Progress.Root>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
          Today's Tasks
        </Typography>
        {current !== undefined ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              border: "1px solid gray",
              backgroundColor: "white",
              width: "600px",
            }}
          >
            {current.length > 0 ? (
              current.map((task,idx) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    justifyContent: "space-between",
                    borderBottom:`${current.length-1==idx?"":"1px solid gray"}`
                  }}
                  
                  key={task.id}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Checkbox
                      checked={task.progress === "Completed" ? true : false}
                      onClick={(e, check) => {
                        handleChecked(task.id, task.progress);
                      }}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="p" sx={{ fontWeight: 500 }}>
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority}
                        sx={{
                          backgroundColor: badgeStyle[task.priority].bg,
                          color: badgeStyle[task.priority].txtColor,
                          width:"100px",
                          fontWeight:600
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: "1px" }}>
                    <IconButton sx={{ fontSize: "15px" }}>Today</IconButton>
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => {
                        navigate(`/edit/${task.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => {
                        handleDelete(task.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center font-semibold text-[25px]">
                No Task Today
              </div>
            )}
          </Box>
        ) : (
          <CircularProgress enableTrackSlot size="3rem" />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" component="h5" sx={{ fontWeight: 600 }}>
          Upcoming / Due Soon
        </Typography>
        {futureTask !== undefined ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            {futureTask.length > 0 ? (
              futureTask.map((task) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    width: "380px",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ fontWeight: 500 }}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ fontWeight: 400, color: "gray", fontSize: "15px" }}
                  >
                    {new Date(task.date).getDay() - new Date().getDay() > 1
                      ? `Due in ${
                          new Date(task.date).getDay() - new Date().getDay()
                        } days `
                      : new Date(task.date).getDay() - new Date().getDay() == 1
                      ? "Due Tomorrow"
                      : "Due Today"}
                  </Typography>
                </Box>
              ))
            ) : (
              <div>No Upcoming Task</div>
            )}
          </Box>
        ) : (
          <CircularProgress enableTrackSlot size="3rem" />
        )}
      </Box>
    </Box>
  );
}
