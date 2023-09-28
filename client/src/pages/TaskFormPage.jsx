import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import FormInput from "../components/FormInput";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getTaskAsync() {
      if (id) {
        const task = await getTask(id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format('YYYY-MM-DD'));
      }
    }
    getTaskAsync();
  }, []);

  const onSubmit = async (data) => {
    const task = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (id) {
      await updateTask(id, task);
    } else {
      await createTask(task);
    }
    navigate("/tasks");
  };

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type={"text"}
          register={register("title", { required: true })}
          autofocus={true}
        />
        <FormInput
          register={register("description", { required: true })}
          InputType="textarea"
        />
        <FormInput type={"date"} register={register("date")} />
        <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
