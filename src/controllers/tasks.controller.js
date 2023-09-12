import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    }); //.populate(user) << to show user document instead of objectId
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json(foundTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const foundTask = await Task.findByIdAndDelete(req.params.id);
    if (!foundTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const foundTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!foundTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json(foundTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
