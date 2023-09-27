import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { tasks, createTask } = useTasks();

  const onSubmit = (data) => {
    createTask(data);
  };

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type={"text"}
          register={register("title", { required: true })}
          placeholder={"Title"}
          autofocus={true}
        />
        <FormTextArea
          register={register("description", { required: true })}
          placeholder={"Description"}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
