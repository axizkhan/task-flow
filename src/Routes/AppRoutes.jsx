import React from "react";
import { Route, Routes } from "react-router";
import AddTask from "../page/AddTask";
import AllTasks from "../page/AllTasks";

import { Edit } from "../page/Edit";
import InboxPage from "../page/InboxPage";
import NoPath from "../page/NoPath";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/add" element={<AddTask />} />
      <Route path="/all-tasks" element={<AllTasks />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/" element={<InboxPage />} />
      <Route path="*" element={<NoPath />} />
    </Routes>
  );
}

export default AppRoutes;
