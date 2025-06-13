import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(); // Implementation for generating salt using bcrypt
    return bcrypt.hash(password, salt); // Implementation for hashing password using bcrypt
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash); // Implementation for comparing password with hash using bcrypt
  }
}
