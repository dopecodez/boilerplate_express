import './LoadEnv';//should be the first import, to load environment before everything else
import 'reflect-metadata';

import { Application } from 'express';
import { Container } from 'inversify';

import { SERVER } from './const/types';
import { receptacle } from './container';
import { ServerInterface } from './server/app.interface';

async function startServer() {
    const container: Container = receptacle.getContainer;
    const server: ServerInterface = container.get(SERVER);
    const app: Application = await server.server();
    app.listen(process.env.PORT, () =>
        console.log(`Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
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