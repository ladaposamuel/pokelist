import { Controller, Get, Post, Middleware } from '@overnightjs/core';
import type { Request, Response } from 'express';

import { type IJwt, isAuthenticated } from '../middleware/auth';
import { UserService } from '../services/userService';
import { AuthService } from '../services/AuthService';
import { handleServiceResponse, validateRequest } from '../util/httpHandlers';
import { ServiceResponse } from '../util/serviceResponse';
import { registerUserSchema, loginUserSchema } from '../schemas/userSchemas';

@Controller('api/user')
export class Users {
  @Get('me')
  @Middleware([isAuthenticated])
  public async me(req: Request, res: Response) {
    const auth = res.locals.auth as IJwt;
    const userId = auth.userId;

    const me = await UserService.id(userId);

    if (!me) {
      return handleServiceResponse(
        ServiceResponse.failure('User not found', null, 404),
        res
      );
    }

    return handleServiceResponse(me, res);
  }

  @Post('register')
  @Middleware([validateRequest(registerUserSchema)])
  public async register(req: Request, res: Response) {
    const { name, email, password, organisationId } = req.body;

    const user = await AuthService.register({
      name,
      email,
      password,
      organisationId,
    });
    return handleServiceResponse(user, res);
  }

  @Post('login')
  @Middleware([validateRequest(loginUserSchema)])
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await AuthService.login({ email, password });

    return handleServiceResponse(user, res);
  }
}
