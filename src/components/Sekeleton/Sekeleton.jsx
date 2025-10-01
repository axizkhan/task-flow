import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
const arr = [1, 2, 3, 4];
function Sekeleton() {
  return (
    <TableBody className="bg-white">
      {arr.map((data) => (
        <TableRow key={data}>
          <TableCell>
            <Skeleton variant="circular" width={20} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={400} height={10} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={150} height={10} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={100} height={10} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={200} height={10} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default Sekeleton;
