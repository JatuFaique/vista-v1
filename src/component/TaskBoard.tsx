import React from "react";
import TaskList from "./TaskList";

function TaskBoard() {
  return (
    <div className="flex flex-nowrap overflow-x-auto md:overflow-hidden">
      <TaskList status='TODO'/>
      <TaskList status="IN_PROGRESS"/>
      <TaskList status="DONE"/>
    </div>
  );
}

export default TaskBoard;
