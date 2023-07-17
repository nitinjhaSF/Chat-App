import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {MessageServiceDataSource} from '../datasources';
import {Filter, Where} from '@loopback/repository';
import {SocketMessage, SocketMessageRecipient} from '../models';

export interface MessageService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  getMessage(
    token: string,
    filter?: Filter<SocketMessage>,
  ): Promise<SocketMessage[]>;
  createMessage(data: SocketMessage, token: string): Promise<SocketMessage>;

  getMessageRecipients(
    token: string,
    filter?: Filter<SocketMessageRecipient>,
  ): Promise<SocketMessageRecipient>[];
  createMessageRecipients(
    data: SocketMessageRecipient,
    token: string,
  ): Promise<SocketMessageRecipient>;
  updateMsgRecipients(
    id: string,
    data: Partial<SocketMessageRecipient>,
    token: string,
    where?: Where<SocketMessageRecipient>,
  ): Promise<SocketMessageRecipient>;
}

export class MessageProvider implements Provider<MessageService> {
  constructor(
    // MessageService must match the name property in the datasource json file
    @inject('datasources.MessageService')
    protected dataSource: MessageServiceDataSource = new MessageServiceDataSource(),
  ) {}

  value(): Promise<MessageService> {
    return getService(this.dataSource);
  }
}
