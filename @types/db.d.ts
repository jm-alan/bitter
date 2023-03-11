declare type AggregateModels = typeof import('../db/models').default;
declare type Associator = (models: AggregateModels) => void;
declare type Initializer = (init: ModelInitialization, models: AggregateModels) => void;

declare type UserSignupAttributes = {
  handle: string;
  displayName: string;
  email: string;
  password: string;
};

declare type ModelInitialization = {
  sequelize: import('sequelize').Sequelize;
};
