import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import BaseRouter from '../modules/baseRouter'
import { ServerInterface } from './app.interface';
const swaggerJSDoc = require('swagger-jsdoc');
import swaggerUiExpress = require('swagger-ui-express');

export default class Server implements ServerInterface {
  app: express.Application;
  constructor() {
    this.app = express();
    this.setup();
  }
  private swaggerDefinition = {
    info: {
      title: `REST API for App`,
      version: 1,
      description: `This is the REST API for App`,
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/api/v1',
  };

  private options = {
    swaggerDefinition: this.swaggerDefinition,
    apis: ['./src/modules/**/docs/*.yaml'],
  };

  public setup(): void {
    const swaggerSpec = swaggerJSDoc(this.options);
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use('/api/v1', BaseRouter);
    this.app.use(cors());
    this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
  }
}



