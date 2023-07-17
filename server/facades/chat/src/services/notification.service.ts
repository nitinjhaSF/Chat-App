import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {NotificationDataSource} from '../datasources';
import {SocketNotification} from '../models';

export interface Notification {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  getNotification(token: string): Promise<SocketNotification[]>;
  createNotification(
    data: SocketNotification,
    token: string,
  ): Promise<SocketNotification>;
}

export class NotificationProvider implements Provider<Notification> {
  constructor(
    // Notification must match the name property in the datasource json file
    @inject('datasources.Notification')
    protected dataSource: NotificationDataSource = new NotificationDataSource(),
  ) {}

  value(): Promise<Notification> {
    return getService(this.dataSource);
  }
}
