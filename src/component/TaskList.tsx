import React, { useEffect } from "react";
import Task from "./Task";
import { useGeminiStore } from "@/lib/store";

function TaskList({ status }: any) {
    const updateTask = useGeminiStore((state) => state.updateTask);
    const tasks = useGeminiStore((state) => state.tasks);
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
    const statusMapping: any = {
        TODO: "To Do",
        IN_PROGRESS: "In Progress",
        DONE: "Done",
    };
    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-2/3 md:w-1/3 h-screen bg-gray-200 flex-shrink-0 mr-2 p-2"
        >
            <h2 className="scroll-m-20 border-b border-black mb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {statusMapping[status]}
            </h2>
            {taskToShow?.map((item, index) => {
                return <Task key={index} {...item} />;
            })}
        </div>
    );
}

export default TaskList;
