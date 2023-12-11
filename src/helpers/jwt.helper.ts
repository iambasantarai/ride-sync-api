import Jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../utils/env.util';

export class TokenManager {
  static async generateToken(payload: object): Promise<string> {
    return Jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return Jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      console.log('ERROR: ', error);
      throw new Error('Token verification failed.');
    }
  }
}
