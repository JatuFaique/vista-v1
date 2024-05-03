"use client";

import { useGeminiStore } from "@/lib/store";
import { useEffect, useState } from "react";
import NewTodoDialog from "../component/Dialoge";
import TaskBoard from "@/component/TaskBoard";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "@/components/ui/dialog";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = useGeminiStore((state) => state.toggleModal);
    const modalVisible = useGeminiStore((state) => state.modalVisible);
    return (
        <main className="flex h-auto flex-col">
            <div className="pt-24 flex flex-col justify-start items-start pl-24 pb-12">
                <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    The Gemini Task Chronicles
                </h1>
                <Dialog>
                    <DialogTrigger
                        onClick={() => {
                            // @ts-ignore
                            toggleModal();
                        }}
                    >
                        <div className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80 h-8 rounded-md px-3 text-m">
                            Create a New Task
                        </div>
                    </DialogTrigger>
                </Dialog>
                <NewTodoDialog />
            </div>
            <div>
                <TaskBoard />
            </div>
        </main>
    );
}
