import { Sequelize } from 'sequelize';

import models from './models';

const sequelize = new Sequelize(process.env.DATABASE_URL, {});

const iterableModels = Object.values(models);

iterableModels.forEach(model => {
  model.initialize(sequelize, models);
});

iterableModels.forEach(model => {
  model.associate(models);
});

export const initialize = async () => {
  // Tests the connection and throws if it fails
  await sequelize.authenticate();

  // Forcibly updates the DB to match the shape of the models;
  // eliminates the need for migrations in smaller projects
  await sequelize.sync({ alter: true });
};
