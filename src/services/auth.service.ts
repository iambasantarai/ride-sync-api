import { User } from '../entities/user.entity';

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

    try {
      await User.save({
        username,
        email,
        phone,
        password,
      });
    } catch (error) {
      console.log('ERROR: ', error);
      throw new Error('Error registering user.');
    }
  }

  static async loginUser(email: string, password: string) {
    const user = await User.findOneOrFail({ where: { email, password } });

    if (!user) {
      throw new Error('Invalid username or password.');
    }

    return user;
  }
}
