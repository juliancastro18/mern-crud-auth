import { useState } from "react";
import { createContext, useContext } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [searchTasks, setSearchTasks] = useState('')

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) {
        setTasks(tasks.filter(task => task._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTask = async (id) => {
    let task = null;
    try {
      const res = await getTaskRequest(id)
      if (res.data) {
        task = res.data
      }
    } catch (error) {
      console.log(task);
    }
    return task;
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, searchTasks, setSearchTasks, createTask, getTasks, deleteTask, getTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}
