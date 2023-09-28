import { useTasks } from "../context/TaskContext";
import FormButton from './FormButton';

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <article className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h2 className="text-2xl font-semibold">{task.title}</h2>
        <div className="flex gap-x-2 items-center">
          <FormButton color="red" onClick={() => {
              deleteTask(task._id);
            }}>
            Delete
          </FormButton>
          <FormButton to={`/tasks/${task._id}`}
          color="blue"
          >Edit</FormButton>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </article>
  );
}

export default TaskCard;
