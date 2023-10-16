import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";
import dependencyInjectorLoader from "./dependencyInjector.js";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();

  const userModel = {
    name: "userModel",
    model: (await import('../models/user.js')).default,
  };
  const taskModel = {
    name: "taskModel",
    model: (await import('../models/task.js')).default,
  };

  dependencyInjectorLoader([userModel, taskModel]);

  expressLoader({ app: expressApp });
};
