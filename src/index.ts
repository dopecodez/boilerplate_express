import Server from './server/app';
import { logger } from './config/logger';
import { receptacle } from './container';
import { Container } from 'inversify';
import 'reflect-metadata';

// Start the server
const port = Number(process.env.PORT || 3000);

const container: Container = receptacle.getContainer;

let server = new Server();

server.app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});
