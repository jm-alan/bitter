import { InferAttributes, InferCreationAttributes, Model, UUID } from 'sequelize';

export default class Like extends Model<
  InferAttributes<Like>,
  InferCreationAttributes<Like>
> {
  declare userID: string;
  declare bitID: string;

  static associate: Associator = ({ User, Bit }) => {
    Like.belongsTo(User, { foreignKey: 'userID' });
    Like.belongsTo(Bit, { foreignKey: 'bitID' });
  };

  static initialize: Initializer = (sequelize) => {
    Like.init({
      userID: {
        type: UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      bitID: {
        type: UUID,
        allowNull: false,
        references: {
          model: 'Bits',
          key: 'id'
        }
      }
    }, {
      modelName: 'Like',
      sequelize
    });
  };
}
