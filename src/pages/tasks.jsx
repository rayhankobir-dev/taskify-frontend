/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputSelect from "../components/Select";
import TaskAddModal from "../components/TaskAdd";
import Tasks from "../components/Tasks";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const createTask = async (task) => {
  const toastId = toast.loading("Creating...");

  const response = await fetch("https://taskify-api.vercel.app/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth"),
    },
    body: JSON.stringify({ ...task }),
  });

  const data = await response.json();

  if (response.ok) {
    toast.success("Created new task", { id: toastId });
  } else {
    toast.success(data.error, { id: toastId });
  }
};

// eslint-disable-next-line react/prop-types
function TasksPage() {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm({ mode: onblur });

  useEffect(() => {
    const promise = fetchTasks();
    promise.then((result) => {
      filterByTitle("", result);
    });
  }, [status]);

  function filterByTitle(title, data) {
    if (title == "") {
      setTasks(
        data?.filter((item) => item.status == status || status == "All")
      );
    } else {
      setTasks(
        tasks.filter((item) =>
          item.title.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
  }

  const fetchTasks = async () => {
    const response = await fetch("https://taskify-api.vercel.app/api/tasks");
    const tasks = await response.json();
    if (tasks) {
      setTasks(tasks);
      setLoading(false);
    }
    return tasks;
  };
  console.log("Hello");
  return (
    <main>
      <section className="mt-4 bg-gray-50 p-4 rounded-t-md border border-gray-100">
        <h1 className="font-bold text-2xl">All Tasks</h1>
        <p className="font-light text-sm max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          libero, ipsam veritatis mollitia et ut perferendis possimus vitae eos.
        </p>

        <div className="flex mt-2 md:mt-0 flex-col md:flex-row justify-between md:items-end">
          <button
            onClick={() => setOpenModal(true)}
            className="h-fit py-2 px-5 border bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Add Task
          </button>
          <form
            onSubmit={handleSubmit((form) => filterByTitle(form.title))}
            className="py-2 w-full md:w-fit flex flex-col md:flex-row justify-between items-end gap-2 gap-x-3 "
          >
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="block w-full  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <InputSelect
              selected={status}
              items={["All", "Pending", "Progress", "Completed"]}
              setSlected={setStatus}
            />
          </form>
        </div>
      </section>

      {loading ? <Loader /> : <Tasks tasks={tasks} />}

      <TaskAddModal
        title="Add new task"
        subTitle="Please enter task information and click on add button."
        action="Add"
        onAction={(data) => createTask(data)}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      />
    </main>
  );
}

export default TasksPage;
