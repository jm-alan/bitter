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
