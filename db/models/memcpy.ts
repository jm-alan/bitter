import { InferAttributes, InferCreationAttributes, Model, UUID } from 'sequelize';

export default class MemCopy extends Model<
  InferAttributes<MemCopy>,
  InferCreationAttributes<MemCopy>
> {
  declare userID: string;
  declare bitID: string;

  static associate: Associator = ({ User, Bit }) => {
    MemCopy.belongsTo(User, { foreignKey: 'userID' });
    MemCopy.belongsTo(Bit, { foreignKey: 'bitID' });
  };

  static initialize: Initializer = (sequelize, { User, Bit }) => {
    MemCopy.init({
      userID: {
        type: UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      bitID: {
        type: UUID,
        allowNull: false,
        references: {
          model: Bit,
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'MemCopy'
    });
  };
}
