import React, { useState } from "react";
import { Checkbox } from "@base-ui-components/react/checkbox";

function SubTaskRow({subTask,task,setTask}) {
    const [checked,setChecked]=useState(subTask.isCompleted);
  return (
    <li className="px-3 py-2 bg-gray-100 rounded-2xl flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <Checkbox.Root
          onCheckedChange={() => {
            setChecked(!checked);
            task.subTask.map((sub)=>{
              if(sub.id===subTask.id){
                sub.isCompleted=!checked;
              }
            });
            // console.log(task.subTask);
            setTask(task);
          }}
          className="flex size-5 items-center border-2 justify-center rounded-[50%]   data-[checked]:bg-[#14F3DC] data-[checked]:border-0 data-[unchecked]:border-2 data-[unchecked]:border-gray-300"
          defaultChecked={checked}
        >
          <Checkbox.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
            <CheckIcon className="size-5 " />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <p>{subTask.task}</p>
      </div>

      {checked && (
        <i className="fa-regular fa-circle-check text-green-500 text-xl"></i>
      )}
    </li>
  );
}

export default SubTaskRow;

function CheckIcon() {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10"  >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
