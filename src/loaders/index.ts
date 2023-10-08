import express from 'express';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();

  // const userModel = {
  //   name: 'userModel',
  //   model: require('../models/user').default,
  // };

  // const { agenda } = await dependencyInjectorLoader({
  //   mongoConnection,
  //   models: [
  //     userModel,
  //   ],
  // });

  await expressLoader({ app: expressApp });
};