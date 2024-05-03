"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NewTodoDialog from "./Dialoge";
import { useGeminiStore } from "@/lib/store";

function Task(props: any) {
  const { title, description } = props;
  const setCurrentTask = useGeminiStore(state=>state.setCurrentTask);
  const toggleModal = useGeminiStore((state) => state.toggleModal);
  return (
    <Card draggable="true">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Dialog>

          <DialogTrigger onClick={() => {
            // @ts-ignore
            setCurrentTask(props);
            // @ts-ignore
            toggleModal();
            }}>Open</DialogTrigger>
        </Dialog>
      </CardHeader>
    </Card>
  );
}

export default Task;
