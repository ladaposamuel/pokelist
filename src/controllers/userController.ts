import { Controller, Get, Middleware } from '@overnightjs/core';
import type { Request, Response } from 'express';
// import { NotAuthenticated } from '../exceptions';
// import { type IJwt, isAuthenticated } from '../middleware/auth';
import { UserService } from '../services/userService';
import { handleServiceResponse } from '../util/httpHandlers';

@Controller('api/user')
export class Users {
  @Get('')
  //   @Middleware([isAuthenticated])
  public async me(req: Request, res: Response) {
    //const auth = res.locals.auth as IJwt;

    // const me = await UserService.id(auth.userId);

    // if (!me) {
    //   throw new NotAuthenticated();
    // }

    const me = await UserService.id(133);

    return handleServiceResponse(me, res);
  }
}
