import 'dotenv/config';
import 'express-async-errors';

import { Server } from '@overnightjs/core';

import 'reflect-metadata';

import compression from 'compression';
import cookies from 'cookie-parser';
import cors from 'cors';

import { type NextFunction, type Request, type Response, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import signale from 'signale';
import { APP_URI, NODE_ENV, PORT } from './app/constants';

import DBConnection from './database/connection';
import { Users } from './controllers/userController';
import { handleServiceResponse } from './util/httpHandlers';

import { ServiceResponse } from './util/serviceResponse';

const server = new (class extends Server {
  public constructor() {
    super();

    this.app.use(
      compression({
        threshold: 0,
      })
    );

    // Parse the rest of our application as json
    this.app.use(json({ limit: '50mb' }));
    this.app.use(cookies());
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: [APP_URI],
        credentials: true,
      })
    );

    this.app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'short'));

    this.addControllers([new Users()]);

    // this.app.use('/', (req, res) => {
    //   res.send('Hello World!');
    // });

    this.app.use('*', (_req, res) => {
      return handleServiceResponse(
        ServiceResponse.failure('Unknown route', null, 404),
        res
      );
    });
  }
})();

server.app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

server.app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    signale.error(error);

    const statusCode = error.statusCode || 500;
    const serviceResponse = ServiceResponse.failure(
      error.message,
      null,
      statusCode
    );

    handleServiceResponse(serviceResponse, res);

    // Call next() to pass control to the next middleware
    next();
  }
);

DBConnection.initialize()
  .then(() => {
    signale.success('Database connected');
    server.app.listen(PORT, () => {
      signale.success(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => signale.error('Database connection error:', error));
