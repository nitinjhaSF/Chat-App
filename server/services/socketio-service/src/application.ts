import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  HttpServerResolvedOptions,
  ServerOptions,
  SocketIoApplication,
} from '@loopback/socketio';
import debugFactory from 'debug';
import {SocketIoController} from './controllers';
import * as dotenv from 'dotenv';

const debug = debugFactory('loopback:example:socketio:demo');

export {ApplicationConfig};

export class SocketIoExampleApplication extends BootMixin(SocketIoApplication) {
  constructor(options: ApplicationConfig = {}) {
    const port = 3005;
    dotenv.config();

    const allowedOrigins = process.env.ALLOWED_ORIGINS ?? '*';

    options.httpServerOptions = Object.assign({}, options.httpServerOptions, {
      host: process.env.HOST,
      port: +(process.env.PORT ?? port),
      basePath: process.env.BASE_PATH ?? '',
      cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
      },
    } as HttpServerResolvedOptions);

    options.socketIoOptions = Object.assign({}, options.socketIoOptions, {
      path: `${process.env.BASE_PATH ?? ''}/socket.io`,
      cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
      },
    } as ServerOptions);

    super(options);

    this.projectRoot = __dirname;

    this.socketServer.use((socket, next) => {
      debug('Global middleware - socket:', socket.id);
      next();
    });

    const ns = this.socketServer.route(SocketIoController);
    ns.use((socket, next) => {
      debug(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });
  }
}
