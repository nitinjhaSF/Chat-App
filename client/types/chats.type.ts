export interface MessageNode {
  id: string;
  channelId: string;
  channelType: string;
  subject: string;
  body: string;
}

export interface StandardMessage extends MessageNode {
  deleted: boolean;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  status: number;
  toUserId: string;
}

export interface ExtendedMessage extends StandardMessage {
  deletedOn: string;
  deletedBy: string | null;
  parentMessageId: string | null;
}

export type MessageVariant = StandardMessage | ExtendedMessage;

export interface MessageDateGroup {
  date: Date;
  messages: MessageVariant[];
}
