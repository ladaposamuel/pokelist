import type { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../app/constants';
import { ServiceResponse } from '../util/serviceResponse';

export interface IJwt {
  type: 'jwt';
  userId: number;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json(
        ServiceResponse.failure('No authorization header passed', null, 401)
      );
  }

  const userId = jwt.verify(token);

  if (!userId) {
    return res
      .status(401)
      .json(ServiceResponse.failure('Invalid credentials', null, 401));
  }

  res.locals.auth = { userId };

  next();
};

export const jwt = {
  verify(token: string): string | null {
    try {
      const verified = jsonwebtoken.verify(token, JWT_SECRET);
      return verified.id;
    } catch (e) {
      throw new Error(`Invalid token: ${e}`);
    }
  },
  sign(id: string): string {
    return jsonwebtoken.sign({ id }, JWT_SECRET, {
      expiresIn: '168h',
    });
  },
};
