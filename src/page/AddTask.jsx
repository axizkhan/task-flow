import React, { useEffect, useState,useContext } from "react";
import MyBottons from "../components/smallComponents/MyBottons";
import MyInput from "../components/smallComponents/MyInput";
import { Menu } from "@base-ui-components/react/menu";
import { Input } from "@mui/base";
import Alert from '@mui/material/Alert';
import { TasksContext } from "../contexts/TaskContext";
import uuid4 from "uuid4";
import { useNavigate } from "react-router";
// import Typography from "@mui/material/Typography";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("No priority");
  const [subTask, setSubTask] = useState("");
  const navigate=useNavigate();

  const[error,setError]=useState({title:false,description:false,date:false,priority:false,isError:false});
  const [errorMsg,seterrorMsg]=useState({title:"",description:"",date:""})
  const {tasks,setTasks}=useContext(TasksContext);

  function hanadleSave() {
    // console.log(subTask.split('\n'));
    const data = {
      title: title,
      description: description,
      date: date,
      priority: priority,
      subTask: subTask.split('\n'),
    };
    data.subTask=data.subTask.map((sub)=>{
      return{task:sub,isCompleted:false,id:uuid4()}
    })

    // console.log(data.subTask);
    const errorSet={isError:false}
    for(let field in data){
        if(!(data[field])&&field!=="subTask"){
            console.log(field);
            errorSet[field]=true;
            errorSet.isError=true;
            errorMsg[field]=`${field} is required`;
        }

    }
    if(!errorSet.date){
        let today=new Date(new Date().setDate(new Date().getDate()-1));
        let currentDate=new Date(data.date);
        console.log(today,currentDate);
        if(today>currentDate){
            error.date=true;
            errorMsg.date="Unfortunatly we dont habe time machine to go to the past"
            errorSet.date=1;
            errorSet.isError=true;

        }
    }
    setError(errorSet);
    seterrorMsg(errorMsg);

    

    if(!errorSet.isError){
        data.id=uuid4();
        data.progress="Beginning"
        let newTask=[...tasks,data];
        localStorage.setItem("tasks",JSON.stringify(newTask));
        setTasks(newTask);
        // alert("data saved succesfully");
        navigate("/all-tasks");
    
        
    }else{
        // alert("Data is not saved successfully");
    }


    console.log(error);
  }


  // let lgSiz = 24px;
  return (
    <div className="flex flex-col px-60 gap-8 pt-5">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-black text-[30px] font-bold">New Task</h1>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="font-semibold text-[15px]">
            Title
          </label>

          <Input
            placeholder="e.g, Design a new landing page"
            className="w-150 h-[40px] py-1 text-l px-2 border-gray-300 border-2 rounded-[14px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
          />
          {error.title&&<Alert severity="error" variant="outlined">{errorMsg.title}</Alert>}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[15px]" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Add more details about the task..."
            className="border-2 border-gray-300 px-2 py-2 w-150 h-[150px] rounded-[10px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {error.description&&<Alert severity="error" variant="outlined">{errorMsg.description}</Alert>}
        </div>
        <div className="flex justify-between">
          <div className=" flex flex-col gap-2">
            <label htmlFor="date" className="font-semibold text-[15px]">Due Date</label>
            <input
              type="date"
              placeholder="Select date"
              className="w-65 h-[30px] px-2  rounded-[10px] border-2 border-gray-300"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
              id="date"
            />
            {error.date&&<Alert severity="error" className="w-65" variant="outlined">{errorMsg.date}</Alert>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="font-semibold text-[15px] ">Priority</label>
            <select
              name="priority"
              id="priority"
              className="w-70 h-[30px] border-2 border-gray-300 rounded-[10px]"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              
            >
              <option value="No priority">No priority</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subTask" className="font-semibold text-[15px]">Subtasks</label>
          <textarea
            name="subTask"
            id="subTask"
            placeholder="Add more details about the task..."
            className="border-2 border-gray-300 px-2 py-2 w-150 h-[150px] rounded-[10px]"
            value={subTask}
            onChange={(e) => setSubTask(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="self-end flex gap-5">
        <MyBottons
          title={"Cancel"}
          bg={"bg-gray-200"}
          px={5}
          py={1}
          color={"text-black"}
          round={"rounded-[12px]"}
          onClick={()=>{
            navigate("/all-tasks");
          }}
        />
        <MyBottons
          title={"Save Task"}
          bg={"bg-[#19e6d1]"}
          px={4}
          py={1}
          color={"text-black"}
          round={"rounded-[12px]"}
          onClick={hanadleSave}
        />
      </div>
    </div>
  );
}

export default AddTask;
