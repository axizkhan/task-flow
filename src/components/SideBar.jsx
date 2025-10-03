import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate,useLocation } from "react-router";
const menu = [
  { title: "Inbox", icon: "fa-inbox",link:"/" },
  { title: "All Task", icon: "fa-circle-notch",link:"/all-tasks" },
  // { title: "Upcoming", icon: "fa-calendar" ,link:"/upcoming"},
  // { title: "Completed", icon: "fa-check-to-slot",link:"completed" },
  // {
  //   title: "Tags",
  //   icon: "fa-tags",
  // },
];

function SideBar() {
  const [select, setSelect] = useState("/");
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    
    setSelect(location.pathname);
  })
  // console.log("SideBar rerender");
  return (
    <div className="flex flex-col justify-between gap-98 pt-4 px-6 pb-3 font-inter sticky top-0 h-[100vh] bg-white ">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex gap-2 items-center">
          <img src="./logo.svg" alt="" className="h-[30px] w-[20px]" />
          <h1 className="font-bold text-xl">Task Flow</h1>
        </div>
        <ul className="flex flex-col justify-between gap-4 ">
          {menu.map((menudis,idx) => (
            <li
            key={idx}
              className={`flex gap-2 items-center  ${
                select === menudis.link
                  ? "font-semibold py-1.5 bg-[#d1faf6]"
                  : "text-gray-400"
              } py-1 px-2  rounded-[10px] cursor-pointer`}
              onClick={() => {setSelect(menudis.link)
                navigate(menudis.link);
              }}
            >
              <span>
                <i className={`fa-solid ${menudis.icon}`}></i>
              </span>
              <span className="">{menudis.title}</span>
            </li>
          ))}
  
        </ul>
      </div>

    
       <Button
            variant="contained"
            sx={{
              backgroundColor: "#14F3DC",
              borderRadius: "20px",
              padding: "8px 25px",
              color: "black",
              width:"200px"
            }}
            onClick={()=>{
                navigate("/add");
            }}
          >
            New Task
          </Button>
    </div>
  );
}

export default SideBar;
