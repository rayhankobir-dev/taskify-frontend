import TaskVector from "../assets/task.png";
import Task from "./Task";

// eslint-disable-next-line react/prop-types
function OnlyTask({ tasks = [] }) {
  return (
    <section className="flex justify-center items-center border border-dashed">
      {tasks.length > 0 ? (
        <div className="w-full grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-4">
          {tasks.map((item) => (
            <Task key={item._id} task={item} />
          ))}
        </div>
      ) : (
        <div>
          <img className="h-48" src={TaskVector} alt="task" />
          <h2 className="mt-1 font-light text-xl text-center text-rose-500">
            No task avilable at this moment!
          </h2>
          <p className="font-light text-sm text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      )}
    </section>
  );
}

export default OnlyTask;
