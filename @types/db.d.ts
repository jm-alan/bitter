// Creates a type for the object with all of the models in it
declare type AggregateModels = typeof import('../db/models').default;

// A type for the function which does things like .belongsTo(), .hasMany(), etc
declare type Associator = (models: AggregateModels) => void;

// A type for a wrapper which calls Model#init(), the function which sets
// all of the data types and relations
declare type Initializer = (
  sequelize: import('sequelize').Sequelize,
  models: AggregateModels
) => void;

// Helper for some static user functions like signup and login; omits
// the types that are optional at the time of user creation
declare type UserSignupAttributes = {
  handle: string;
  displayName: string;
  email: string;
  password: string;
};
