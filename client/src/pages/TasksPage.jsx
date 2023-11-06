import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import ViewNote from "../components/note/ViewNote";
import NewNote from "../components/note/NewNote";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col gap-[18px] w-full justify-center items-center">
      <NewNote />
      {tasks.sort( (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((task) => (
        <ViewNote key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;
