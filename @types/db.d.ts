declare type AggregateModels = typeof import('../db/models').default;
declare type Associator = (models: AggregateModels) => void;
declare type Initializer = (
  sequelize: import('sequelize').Sequelize,
  models: AggregateModels
) => void;

declare type UserSignupAttributes = {
  handle: string;
  displayName: string;
  email: string;
  password: string;
};
