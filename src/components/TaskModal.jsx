/* eslint-disable react/prop-types */
import Modal from "react-modal";
import InputSelect from "./Select";
import { useForm } from "react-hook-form";
import { useState } from "react";

const items = ["Pending", "Progress", "Completed"];

// eslint-disable-next-line react/prop-types
const TaskModal = ({
  title,
  subTitle,
  task,
  action,
  isOpen,
  onClose,
  onAction,
}) => {
  const [status, setStatus] = useState(task.status);

  const handleSave = (data) => {
    data.status = status;
    data.id = task._id;
    onAction(data);
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center items-center">
      <Modal
        isOpen={isOpen}
        contentLabel="modal"
        onRequestClose={onClose}
        ariaHideApp={false}
        readOnly={true}
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-25 flex items-center"
        className={
          "overflow-hidden mx-auto my-0 shadow-2xl bg-white rounded-lg w-fit h-fit pt-5"
        }
      >
        <div className="w-96">
          {/* header */}
          <div className="px-5">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="font-light text-sm">{subTitle}</p>
          </div>

          {/* content */}

          {/* content */}
          <form
            method="post"
            onSubmit={handleSubmit((data) => handleSave(data))}
          >
            <div className="flex flex-col mt-8 gap-2 px-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <input
                  {...register("title", {
                    required: true,
                  })}
                  id="title"
                  defaultValue={task.title}
                  type="text"
                  placeholder="Develop payment system"
                  autoComplete="title"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.title && (
                  <p className="px-1 font-light text-sm text-rose-500">
                    Title is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Status
                </label>
                <InputSelect
                  items={items}
                  selected={status}
                  setSlected={setStatus}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: true,
                  })}
                  defaultValue={task.description}
                  id="description"
                  placeholder="Write description..."
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
                {errors.description && (
                  <p className="px-1 font-light text-sm text-rose-500">
                    Description is required
                  </p>
                )}
              </div>
            </div>

            {/* controll */}
            <div className="flex justify-end gap-2 mt-4 py-3 px-5 bg-gray-100">
              <button
                type="button"
                className="py-2 px-4 border border-gray-400 rounded-md text-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-6 border rounded-md bg-blue-600 text-white"
              >
                {action}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
