import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch(`https://taskify-api.vercel.app/api/tasks/`);
    const tasks = await response.json();
    if (tasks) {
      setTasks(tasks);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  return (
    <main>
      <section className="mt-4 bg-gray-50 p-4 rounded-t-md border border-gray-100">
        <h1 className="font-bold text-2xl">Recent Tasks</h1>
        <p className="font-light text-sm max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          libero, ipsam veritatis mollitia et ut perferendis possimus vitae eos.
        </p>
      </section>

      {loading ? <Loader /> : <Tasks tasks={tasks} />}
    </main>
  );
}
