import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<Omit<User, 'passwordHash'> | null> {
        const user = await this.usersService.findByEmail(email);

        if(!user) {
            return null;
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if(!passwordMatches) {
            return null;
        }

        const { passwordHash, ...result } = user;
        return result;
    }
}
