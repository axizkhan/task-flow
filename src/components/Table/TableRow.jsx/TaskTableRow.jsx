import Checkbox from "@mui/material/Checkbox";

import { TableCell, TableRow } from "@mui/material";
import React, { useState, useContext } from "react";
import { Progress, Menu } from "@base-ui-components/react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { SelectRowContext } from "../../../contexts/SelectedRowContext";
import InfoIcon from '@mui/icons-material/Info';


function progress(prg) {
  if (prg.toLowerCase() === "beginning") {
    return 20;
  } else if (prg.toLowerCase() === "near complition") {
    return 80;
  } else if (prg.toLowerCase() === "in progress") {
    return 50;
  } else if (prg.toLowerCase() === "completed") {
    return 100;
  }
}


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

function TaskTableRow({ task,onClick,onNavigate }) {
  const [checked, setChecked] = useState(false);

 

  const { selectRow, setSelectRow } = useContext(SelectRowContext);
  function onCheckedHandle() {
    setChecked(!checked);
    if (!checked) {
      setSelectRow([...selectRow, task.id]);
      console.log(selectRow);
    } else {
      let index = selectRow.indexOf(task.id);
      selectRow.splice(index, 1);
      setSelectRow(selectRow);
      console.log(selectRow);
    }
  }
  return (
    <TableRow>
      <TableCell align="left">
        {" "}
        <Checkbox
          checked={checked}
          onChange={onCheckedHandle}
          // inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="left">{task.title}</TableCell>
      <TableCell align="left">{task.date}</TableCell>
      <TableCell align="left">
        {/* <div className="border"> */}
        <Chip
          label={task.priority}
          sx={{
            backgroundColor: badgeStyle[task.priority].bg,
            color: badgeStyle[task.priority].txtColor,
          }}
        />
        {/* </div> */}
      </TableCell>
      <TableCell align="left">
        <Progress.Root className={"w-[150px]"} value={progress(task.progress)}>
          <Progress.Track
            className={"overflow-hidden h-2 rounded-[5px] bg-[#E0F2FE]"}
          >
            <Progress.Indicator className={"block bg-[#14532D]"} />
          </Progress.Track>
        </Progress.Root>
        <p className="pl-[40px]">{task.progress}</p>
      </TableCell>
      <TableCell align="left">
        {/* <Menu.Root>
          <Menu.Trigger
            className={
              " text-black font-extrabold "
            }
          >
            <i class="fa-solid fa-ellipsis"></i>
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
                  
                >
                  High
                </Menu.Item>

                <Menu.Item
                  className={
                    "self-center hover:font-semibold hover:cursor-pointer"
                  }
                  
                >
                  Low
                </Menu.Item>

                
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root> */}
        <IconButton aria-label="delete" sx={{}} onClick={()=>{onClick(task.id)}}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" color="warning" onClick={()=>{onNavigate(task.id)}}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TaskTableRow;
