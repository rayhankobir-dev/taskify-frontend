/* eslint-disable react/prop-types */
import ProfileImage from "../assets/profile.jpeg";
import { BiEdit } from "react-icons/bi";
import { BsFillTrash3Fill } from "react-icons/bs";
import Badge from "./Badge";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Task({ task }) {
  const [openModal, setOpenModal] = useState(false);

  async function onSave(task) {
    const toastId = toast.loading("Updating...");
    const response = await fetch("http://localhost:8000/api/tasks/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth"),
      },
      body: JSON.stringify({ ...task }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Successfully task updated", { id: toastId });
    } else {
      toast.success(data.error, { id: toastId });
    }
  }

  // delete task
  async function deleteTask() {
    const toastId = toast.loading("Deleting...");

    const response = await fetch("http://localhost:8000/api/tasks/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth"),
      },
      body: JSON.stringify({ id: task._id }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Successfully task deleted", { id: toastId });
    } else {
      toast.success(data.error, { id: toastId });
    }
  }

  return (
    <div className="group flex flex-col gap-2 px-4 py-3 border shadow-sm rounded-md hover:shadow-lg duration-500">
      <div className="flex justify-between">
        <h1 className="font-semibold">{task.title}</h1>
        <div className=" group-hover:block space-x-1">
          <button
            onClick={() => setOpenModal(true)}
            className=" h-6 w-6 p-1 bg-blue-200 text-blue-600 inline-flex justify-center items-center hover:bg-gray-100 rounded-md"
          >
            <BiEdit />
          </button>
          <button
            onClick={deleteTask}
            className="h-6 w-6 p-1 bg-rose-200 text-rose-600 inline-flex justify-center items-center hover:bg-gray-100 rounded-md"
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </div>
      <p className="mb-5 font-light text-sm">{task.description}</p>

      {/* footer */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            className="h-8 w-8 rounded-full"
            src={ProfileImage}
            alt="profile"
          />
          <h3>{task?.author?.name}</h3>
        </div>
        <Badge variant={task.status}>{task.status}</Badge>
      </div>

      <TaskModal
        title="Edit task"
        subTitle="Please enter your modifications and save for make changes."
        task={task}
        isOpen={openModal}
        action="Save"
        onAction={onSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
