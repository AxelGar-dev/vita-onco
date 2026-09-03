import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get('admin-only')
    adminOnly() {
        return 'Hola';
    }
}
