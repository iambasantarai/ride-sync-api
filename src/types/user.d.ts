import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface IRequestWithUser extends Request {
  user?: User;
}
