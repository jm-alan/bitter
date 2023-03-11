import {
  CreationOptional,
  DATE,
  fn,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Op,
  STRING,
  UUID,
  UUIDV4,
  ValidationError,
} from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare handle: string;
  declare displayName: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  validatePass (pass: string): boolean {
    return (!!pass) && compareSync(pass, this.password);
  }

  static async signup ({ handle, displayName, email, password }: UserSignupAttributes): Promise<User> {
    password &&= hashSync(password);
    const user = new User({ handle, displayName, email, password });
    return await user.save();
  }

  static async login ({ handle, email, password }: UserSignupAttributes): Promise<User> {
    if (!handle && !email) {
      throw new ValidationError('Please provide either your handle or email address', []);
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { handle },
          { email }
        ]
      }
    });

    if (!user || !user.validatePass(password)) {
      throw new ValidationError(
        'Either that user does not exist, or the password provided was incorrect',
        []
      );
    }

    return user;
  };

  static associate: Associator = ({ Bit, Like }) => {
    User.hasMany(Bit, { foreignKey: 'userID' });
    User.belongsToMany(Bit, {
      through: Like,
      foreignKey: 'userID',
      otherKey: 'bitID',
      as: 'LikedBit'
    });
  };

  static initialize: Initializer = (sequelize) => {
    User.init({
      id: {
        type: UUID,
        defaultValue: UUIDV4
      },
      handle: STRING(128),
      displayName: STRING(128),
      email: STRING,
      password: STRING,
      createdAt: {
        type: DATE,
        defaultValue: fn('NOW')
      },
      updatedAt: {
        type: DATE,
        defaultValue: fn('NOW')
      }
    }, {
      modelName: 'User',
      sequelize
    });
  };
}
