import React, { useEffect } from "react";
import Task from "./Task";
import { useGeminiStore } from "@/lib/store";

function TaskList({ status }: any) {
    const createTask = useGeminiStore((state) => state.createTask);
    const updateTask = useGeminiStore((state) => state.updateTask);
    const resetStore = useGeminiStore((state) => state.reset);
    const tasks = useGeminiStore((state) => state.tasks);
    console.log("=====", tasks);
    const taskToShow = tasks?.filter((item, index) => {
        return item.status === status;
    });
    const dragTask = useGeminiStore((state) => state.dragTask);

    const draggedTask = useGeminiStore((state) => state.draggedTask);

    useEffect(() => {
        useGeminiStore.persist.rehydrate();
    }, []);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (!draggedTask) return;
        // @ts-ignore
        updateTask(draggedTask, status);
        dragTask(null);
    };
    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-2/3 md:w-1/3 h-screen bg-gray-200 flex-shrink-0 mr-2 p-2"
        >
            {taskToShow?.map((item, index) => {
                return <Task key={index} {...item} />;
            })}
        </div>
    );
}

export default TaskList;
