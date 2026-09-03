import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';
import { UserRole } from './modules/users/entities/user.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const user = await usersService.create({
        email: 'admin@vita-onco.test',
        password: 'password123',
        role: UserRole.ADMIN,
    });

    console.log('User created:', user);

    const reception = await usersService.create({
        email: 'reception@vita-onco.test',
        password: 'password1234',
        role: UserRole.RECEPTION,
    });

    console.log('Reception user created:', reception);

    await app.close();
}

bootstrap();
