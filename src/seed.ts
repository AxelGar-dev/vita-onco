import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';
import { UserRole } from './modules/entities/user.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const user = await usersService.create({
        email: 'admin@vita-onco.test',
        password: 'password123',
        role: UserRole.ADMIN,
    });

    console.log('User created:', user);

    await app.close();
}

bootstrap();
