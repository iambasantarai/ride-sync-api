import { User } from '../entities/user.entity';
import { PasswordManager } from '../helpers/bcrypt.helper';
import { TokenManager } from '../helpers/jwt.helper';

export class AuthService {
  static async registerUser(
    username: string,
    email: string,
    phone: string,
    password: string,
  ) {
    const usernameAlreadyInUse = await User.findOne({ where: { username } });
    if (usernameAlreadyInUse) {
      throw new Error('Username already in use.');
    }

    const emailAlreadyInUse = await User.findOne({ where: { email } });
    if (emailAlreadyInUse) {
      throw new Error('Email is already been taken.');
    }

    const hashedPassword = await PasswordManager.hashPassword(password);

    try {
      await User.save({
        username,
        email,
        phone,
        password: hashedPassword,
      });
    } catch (error) {
      console.log('ERROR: ', error);
      throw new Error('Error registering user.');
    }
  }

  static async loginUser(email: string, password: string) {
    const user = await User.findOneOrFail({ where: { email } });

    if (!user) {
      throw new Error('Invalid username or password.');
    }

    if (!(await PasswordManager.comparePassword(password, user.password))) {
      throw new Error('Invalid username or password.');
    }

    const token = await TokenManager.generateToken({
      userId: user.id,
      email: user.email,
    });

    return token;
  }
}
