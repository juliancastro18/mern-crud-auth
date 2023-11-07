import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";
import dependencyInjectorLoader from "./dependencyInjector.js";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();

  const userModel = {
    name: "userModel",
    model: (await import('../models/user.js')).default,
  };
  const noteModel = {
    name: "noteModel",
    model: (await import('../models/note.js')).default,
  };

  dependencyInjectorLoader([userModel, noteModel]);

  expressLoader({ app: expressApp });
};
