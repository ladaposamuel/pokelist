import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import compression from 'compression';
import cors from 'cors';
import { type NextFunction, type Request, type Response, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from '@overnightjs/core';
import signale from 'signale';

import { APP_URI, NODE_ENV, PORT } from './app/constants';
import { Users } from './controllers/userController';
import { Organisations } from './controllers/organisationController';
import DBConnection from './database/connection';
import { handleServiceResponse } from './util/httpHandlers';
import { ServiceResponse } from './util/serviceResponse';

const server = new (class extends Server {
  public constructor() {
    super();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware() {
    this.app.use(compression({ threshold: 0 }));
    this.app.use(json({ limit: '50mb' }));
    this.app.use(helmet());
    this.app.use(cors({ origin: [APP_URI], credentials: true }));
    this.app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'short'));
  }

  private setupRoutes() {
    this.addControllers([new Users(), new Organisations()]);

    this.app.get('/api', (req, res) => {
      return handleServiceResponse(
        ServiceResponse.success(
          'Welcome to PokeList!',
          { serverTime: new Date().toISOString() },
          200
        ),
        res
      );
    });

    this.app.post('/', (req, res) => {
      return handleServiceResponse(
        ServiceResponse.failure('Invalid request method', null, 405),
        res
      );
    });

    this.app.use('*', (_req, res) => {
      return handleServiceResponse(
        ServiceResponse.failure('Unknown route', null, 404),
        res
      );
    });
  }

  private setupErrorHandling() {
    this.app.use((req, res, next) => {
      console.log(`Incoming request: ${req.method} ${req.path}`);
      next();
    });

    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        signale.error(error);
        const statusCode = error.statusCode || 500;
        const serviceResponse = ServiceResponse.failure(
          error.message,
          null,
          statusCode
        );
        handleServiceResponse(serviceResponse, res);
        next();
      }
    );
  }
})();

DBConnection.initialize()
  .then(() => {
    signale.success('📀 Database connected');
    server.app.listen(PORT, () => {
      signale.success(`📱 Server is running & listening on port ${PORT}`);
      signale.info(`🌍 Visit ${APP_URI} to see the API in action!`);
    });
  })
  .catch((error) => signale.error('Database connection error:', error));
