import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req: ExpressRequest) {
        return this.authService.login(req.user as any);
    }
}
