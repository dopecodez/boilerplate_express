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
    app.listen('3000', () =>
        console.log(`Listening on port ${config.PORT}!`)
    );
}

startServer();

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});