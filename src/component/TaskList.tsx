import React from "react";
import Task from "./Task";
import { useGeminiStore } from "@/lib/store";

function TaskList({ status }: any) {
  const createTask = useGeminiStore((state) => state.createTask);
  const resetStore = useGeminiStore((state) => state.reset);
  const tasks = useGeminiStore((state) => state.tasks);
  console.log("=====",tasks)
  const taskToShow = tasks?.filter((item,index)=>{
    return item.status === status
  })
  return (
    <div className="w-2/3 md:w-1/3 h-screen bg-gray-200 flex-shrink-0 mr-2 p-2">
        {taskToShow?.map((item,index)=>{
            return <Task {...item} />
        })}
    </div>
  );
}

export default TaskList;
