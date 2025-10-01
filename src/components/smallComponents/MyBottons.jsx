import React from "react";
import { Button } from "@mui/base";
function MyBottons({title,text="font-inter",px=4,py=2,bold="semibold",bg="blue-800",color='white',round="5px",onClick}) {
  return (
    <Button
      className={`
        px-${px} py-${py} 
        ${bg} ${color}
        
     shadow ${round}
        font-${bold}
        
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${text}
        
      `}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default MyBottons;
