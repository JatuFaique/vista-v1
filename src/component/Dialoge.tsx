import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useGeminiStore } from "@/lib/store";

function NewTodoDialog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

 

  const createTask = useGeminiStore(state=>state.createTask);
  const modalVisible = useGeminiStore(state=>state.modalVisible);
  const currentTask = useGeminiStore(state=>state.currentTask);
  const setCurrentTask = useGeminiStore(state=>state.setCurrentTask);
  const toggleModal = useGeminiStore((state) => state.toggleModal);
  const editTask = useGeminiStore((state) => state.editTask);
  useEffect(()=>{
    if(currentTask !== undefined ){
        console.log('aa', currentTask)
        setFormData({
            // @ts-ignore
            title: currentTask?.title,
             // @ts-ignore
            description:currentTask?.description,
             // @ts-ignore
            status:currentTask?.status
        })
    }
  },[modalVisible, currentTask])

  const validateTitle = (title:any) => {
    if (!/^[a-zA-Z\s]+$/.test(title)) {
      return "Title should only contain alphabets";
    }
    return "";
  };

  const validateDescription = (description:any) => {
    if (description.length < 25) {
      return "Description should be at least 25 characters long";
    }
    return "";
  };

  const handleChange = (e:any) => {
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear previous errors
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    // Validation
    const titleError = validateTitle(formData.title);
    const descriptionError = validateDescription(formData.description);

    setErrors({
      title: titleError,
      description: descriptionError,
    });

    if (titleError || descriptionError) {
      // Form has errors, do not submit
      return;
    }

    // Dummy submit function
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
    };
    // @ts-ignore
    if(currentTask && Object.keys(currentTask).length> 0){
        // @ts-ignore
        editTask({    
            ...payload,
            id: currentTask?.id
        },currentTask?.id)
    }else{
         // @ts-ignore
        createTask({
            id: Math.floor(Math.random() * 1000), // Generating a random id for demonstration
            ...payload
        })
    }

   
  

    // Reset form after submit
    setFormData({
      title: "",
      description: "",
      status: "",
    });
    // @ts-ignore
    toggleModal()
  };



  return (
    <Dialog open={modalVisible}> 
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            What do you want to get done today?
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
              className="col-span-4"
            />
            {errors.title && (
              <Label className="col-span-4 text-red-500">{errors.title}</Label>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="col-span-4"
            />
            {errors.description && (
              <Label className="col-span-4 text-red-500">
                {errors.description}
              </Label>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select name="status"  onValueChange={(newStatus)=>{
                setFormData((prev)=>{
                    return {
                        ...prev,
                        status:newStatus
                    }
                })
            }}>
              <SelectTrigger className="col-span-4" id="status">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="TODO">Todo</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
            <DialogClose asChild>
            <Button onClick={()=>{
                // @ts-ignore
                setCurrentTask({})
                // @ts-ignore
                toggleModal()
                }} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Add Todo
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewTodoDialog;
