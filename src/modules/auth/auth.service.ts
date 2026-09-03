import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

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

    login(user: Omit<User, 'passwordHash'>) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
