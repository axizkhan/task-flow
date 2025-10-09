import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router";
// import { Checkbox } from "@base-ui-components/react/checkbox";
import Checkbox from "@mui/material/Checkbox";

import Sekeleton from "../Sekeleton/Sekeleton";

import TaskTableRow from "./TableRow.jsx/TaskTableRow";
import React from "react";

function TaskTable({ tasks, setTasks }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const emptyRow=page>0:Math.max()
  const emptyRow = (function () {
    if (tasks !== undefined) {
      let currentPage = page + 1;
      let tasksLength = tasks.length;
      // return (((page+1)*rowsPerPage)-tasks.length)
      return currentPage * rowsPerPage - tasksLength + 1;
    }
  })();
  const handleChangePage = (event, newPage) => {
    console.dir(page);
    setPage(newPage);
    console.log(emptyRow);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function onHandleDelte(args) {
    let newTask = tasks.filter((task) => task.id !== args);

    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  }

  function onNavigate(args) {
    console.log(args);
    navigate(`/edit/${args}`);
  }
  return (
    <React.Fragment>
      <TableContainer className="border-2 border-gray-300 rounded-[20px] bg-gray-100 ">
        <Table
          sx={{
            minWidth: 500,

            borderRadius: "20px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox />
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                Task
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                DUE DATE
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                PRIORITY
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                PROGRESS
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          {tasks !== undefined ? (
            <TableBody className="bg-white">
             
              {tasks.length > 0 ? (
                tasks
                  .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                  .map((task) => (
                    <TaskTableRow
                      task={task}
                      key={task.id}
                      onClick={onHandleDelte}
                      onNavigate={onNavigate}
                    />
                  ))
              ) : (
                <TableRow
                  style={{
                    height: 60 * rowsPerPage,
                  }}
                >
                  <TableCell
                    colSpan={6}
                    sx={{
                      paddingLeft: "35%",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                    rowSpan={rowsPerPage / 2}
                  >
                    No Data is Available
                  </TableCell>
                </TableRow>
              )}
              {tasks.length > 0 && emptyRow > 0 && (
                <TableRow
                  style={{
                    height: 60 * emptyRow,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          ) : (
            <Sekeleton />
          )}
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
        <TableFooter>
          <TableRow>
          
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={tasks !== undefined ? tasks.length : 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            
          </TableRow>
        </TableFooter>
      </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default TaskTable;
