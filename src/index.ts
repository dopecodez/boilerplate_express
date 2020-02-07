import 'reflect-metadata';

import { Application } from 'express';
import { Container } from 'inversify';

import { config } from './config/config';
import { SERVER } from './const/types';
import { receptacle } from './container';
import { ServerInterface } from './server/app.interface';

async function startServer() {
    const container: Container = receptacle.getContainer;
    const server: ServerInterface = container.get(SERVER);
    const app: Application = await server.server();
    const isDevelopment: boolean =
        config.NODE_ENV === 'staging' || config.NODE_ENV === 'development';
    app.listen(config.PORT, () =>
        console.log(`Listening on port ${config.PORT}!`)
    );
}

export default startServer;