import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <article key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </article>
      ))}
    </div>
  );
}

export default TasksPage;
