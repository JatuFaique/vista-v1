import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ITask = {
    id?: number;
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    label?: "HOME" | "WORK" | "SCHOOL";
};

type Store = {
    tasks?: ITask[];
    modalVisible: boolean;
    currentTask?: ITask | undefined;
    draggedTask?: string | null;
};

type Actions = {
    createTask?: (task: ITask) => void;
    removeTask?: (id?: number) => void;
    updateTask: (title: string, status: any) => void;
    editTask: (task?: ITask, id?: number) => void;
    toggleModal?: () => void;
    setCurrentTask?: (task: ITask) => void;
    dragTask: (id: string | null) => void;
    reset: () => void;
};

export const useGeminiStore = create<Store & Actions>()(
    persist(
        (set) => ({
            tasks: [],
            currentTask: undefined,
            modalVisible: false,
            createTask: (task) =>
                set((state) => {
                    return {
                        // @ts-ignore
                        tasks: [...state.tasks, task],
                    };
                }),
            dragTask: (id: string | null) => set({ draggedTask: id }),
            updateTask: (id: string, status: any) =>
                set((state) => ({
                    // @ts-ignore
                    tasks: state?.tasks.map((task) =>
                        // @ts-ignore
                        task.id === id ? { ...task, status } : task
                    ),
                })),
            // @ts-ignore
            removeTask: (id: number) =>
                set((state) => ({
                    // @ts-ignore
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),
            editTask: (task: ITask | undefined, id: number | undefined) =>
                // @ts-ignore
                set((state) => ({
                    // @ts-ignore
                    tasks: state.tasks.map((currtTask) =>
                        currtTask.id === id ? task : currtTask
                    ),
                })),
            toggleModal: () => {
                set((state) => {
                    return {
                        ...state,
                        modalVisible: !state.modalVisible,
                    };
                });
            },
            reset: () => {
                useGeminiStore.persist.clearStorage();
            },
            setCurrentTask: (task: ITask) => {
                set((state) => {
                    return {
                        ...state,
                        currentTask: task,
                    };
                });
            },
        }),
        {
            name: "lopa",
        }
    )
);
