import User from './user';
import Bit from './bit';
import Like from './like';
import MemCopy from './memcpy';

const aggregateModels = {
  User,
  Bit,
  Like,
  MemCopy
} as const;

export default aggregateModels;
