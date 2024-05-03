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
  currentTask?: ITask|undefined;
};

type Actions = {
  createTask?: (task: ITask) => void;
  removeTask?: (id?: number) => void;
  update?: (id?: number) => void;
  editTask: (task?: ITask, id?: number) => void;
  toggleModal?: ()=>void;
  setCurrentTask?: (task:ITask)=>void;
  reset:()=>void;
};

export const useGeminiStore = create<Store & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      currentTask:undefined,
      modalVisible:false,
      createTask: (task) =>
        set((state) => {
          return {
            // @ts-ignore
            tasks: [...state.tasks, task],
          };
        }),
      removeTask: () => {},
      update: () => {},
      editTask: (task: ITask | undefined, id:number|undefined) =>
       // @ts-ignore
      set(state => ({
        // @ts-ignore
        tasks: state.tasks.map(currtTask => currtTask.id === id ? task : currtTask
        )
      })),
      toggleModal:()=>{
        set((state)=>{
            return {
                ...state,
                modalVisible: !state.modalVisible
            }
        })
      },
      reset: () => {
        useGeminiStore.persist.clearStorage();
      },
      setCurrentTask: (task:ITask)=>{
        set((state)=>{
            return {
                ...state,
                currentTask: task
            }
        })
      }
    }),
    {
      name: "lopa"
    }
  )
);
