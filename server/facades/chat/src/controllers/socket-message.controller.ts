// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CONTENT_TYPE,
  IAuthUserWithPermissions,
  OPERATION_SECURITY_SPEC,
  STATUS_CODE,
} from '@sourceloop/core';
import {
  SocketMessage,
  SocketMessageRecipient,
  SocketNotification,
} from '../models';
import {MessageService, Notification} from '../services';
import {
  AuthenticationBindings,
  STRATEGY,
  authenticate,
} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../enums';

export class SocketMessageController {
  constructor(
    @inject('services.Message') private readonly chatService: MessageService,
    @inject('services.Notification')
    private readonly notificationService: Notification,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewMessage]})
  @get('/messages', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Array of Message model instances',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SocketMessage, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.header.string('Authorization') token: string,
    @param.query.string('channelId') channelId: string,
  ): Promise<SocketMessage[]> {
    const filter: Filter<SocketMessage> = {
      where: {
        channelId,
      },
      order: ['createdOn ASC'],
    };

    return this.chatService.getMessage(token, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.CreateMessage]})
  @post('/messages', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Message Modal instance',
        content: {[CONTENT_TYPE.JSON]: getModelSchemaRef(SocketMessage)},
      },
    },
  })
  async createMessage(
    @param.header.string('Authorization') token: string,
    @requestBody({
      content: {
        [CONTENT_TYPE.JSON]: {
          schema: getModelSchemaRef(SocketMessage, {
            title: 'Message',
            exclude: ['id'],
          }),
        },
      },
    })
    message: Omit<SocketMessage, 'id'>,
  ): Promise<SocketMessage> { 
    message.channelId = message.channelId ?? message.toUserId;
    const msg = await this.chatService.createMessage(message, token);
    const msgRecipients = new SocketMessageRecipient({
      channelId: message.channelId,
      recipientId: message.toUserId ?? message.channelId,
      messageId: msg.id,
    });

    await this.chatService.createMessageRecipients(msgRecipients, token);

    const notification = new SocketNotification({
      subject: message.subject,
      body: message.body,
      type: 0,
      receiver: {
        to: [
          {
            type: 0,
            id: message.channelId,
          },
        ],
      },
    });

    await this.notificationService.createNotification(notification, token);

    return msg;
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.UpdateMessageRecipient],
  })
  @patch('/messages/{messageId}/markAsRead', {
    security: OPERATION_SECURITY_SPEC,
    responses: {},
  })
  async patchMessageRecipients(
    @param.header.string('Authorization') token: string,
    @param.path.string('messageId') messageId: string,
  ): Promise<SocketMessageRecipient> {
    const patchedData: Partial<SocketMessageRecipient> = {
      isRead: true,
    };

    return this.chatService.updateMsgRecipients(messageId, patchedData, token);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: ['*'],
  })
  @get('/userTenantId', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      [STATUS_CODE.OK]: {
        description: 'To get the userTenantId',
        content: {
          [CONTENT_TYPE.TEXT]: {
            type: 'string',
          },
        },
      },
    },
  })
  async getUserTenantId(
    @inject(AuthenticationBindings.CURRENT_USER) user: IAuthUserWithPermissions,
  ): Promise<string> {
    return user.userTenantId ?? '';
  }
}
