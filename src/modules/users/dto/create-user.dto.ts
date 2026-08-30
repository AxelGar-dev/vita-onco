import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserRole } from 'src/modules/entities/user.entity';

export class CreateUserDto {
    @IsEmail()
        email!: string;

    @MinLength(8)
        password!: string;

    @IsEnum(UserRole)
        role!: UserRole;
}
