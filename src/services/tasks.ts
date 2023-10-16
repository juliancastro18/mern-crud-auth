import { Service, Inject } from "typedi";
import { ITask, ITaskInputDTO } from "../interfaces/ITask.js";

@Service()
export default class TaskService {
  constructor(
    @Inject("taskModel")
    private taskModel: Models.TaskModel
  ) {}

  public async GetTasks(userId: string): Promise<ITask[]> {
    try {
      const tasks = await this.taskModel.find({ user: userId });
      return tasks;
    } catch (e) {
      throw e;
    }
  }

  public async GetTask(taskId: string): Promise<ITask> {
    try {
      const task = await this.taskModel.findById(taskId);
      return task;
    } catch (e) {
      throw e;
    }
  }

  public async PostTask(taskInput: ITaskInputDTO, userId: string): Promise<ITask> {
    try {
      const newTask = new this.taskModel({ ...taskInput, user: userId });
      const savedTask = await newTask.save();
      return savedTask;
    } catch (e) {
      throw e;
    }
  }

  public async UpdateTask(taskId: string, taskInput: ITaskInputDTO): Promise<ITask> {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        taskInput,
        {
          new: true,
        }
      );
      return updatedTask;
    } catch (e) {
      throw e;
    }
  }

  public async DeleteTask(taskId: string): Promise<ITask> {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
      return deletedTask;
    } catch (e) {
      throw e;
    }
  }

}
