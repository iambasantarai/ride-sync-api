import pkg from 'bcryptjs';

const { compare, genSalt, hash } = pkg;

export class PasswordManager {
  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
