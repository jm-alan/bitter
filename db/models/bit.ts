import { CreationOptional, DATE, fn, InferAttributes, InferCreationAttributes, Model, STRING, UUID, UUIDV4 } from 'sequelize';

export default class Bit extends Model<
  InferAttributes<Bit>,
  InferCreationAttributes<Bit>
> {
  declare id: CreationOptional<string>;
  declare userID: string;
  declare replyToID?: string;
  declare body: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate: Associator = ({ User, Like, MemCopy }) => {
    Bit.belongsTo(User, { foreignKey: 'userID' });
    Bit.belongsTo(Bit, { foreignKey: 'replyToID', as: 'Parent' });
    Bit.hasMany(Bit, { foreignKey: 'replyToID', as: 'Reply' });
    Bit.belongsToMany(User, {
      through: Like,
      as: 'LikingUser',
      foreignKey: 'bitID',
      otherKey: 'userID'
    });
    Bit.belongsToMany(User, {
      through: MemCopy,
      as: 'CopyingUser',
      foreignKey: 'bitID',
      otherKey: 'userID'
    });
  };


  static initialize: Initializer = (sequelize, { User }) => {
    Bit.init({
      id: {
        type: UUID,
        defaultValue: UUIDV4
      },
      userID: {
        type: UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      replyToID: {
        type: UUID,
        references: {
          model: Bit
        }
      },
      body: STRING(512),
      createdAt: {
        type: DATE,
        defaultValue: fn('NOW')
      },
      updatedAt: {
        type: DATE,
        defaultValue: fn('NOW')
      }
    }, {
      modelName: 'Bit',
      sequelize
    });
  };
}
