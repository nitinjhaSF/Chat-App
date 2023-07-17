SET search_path
TO main,public;

/* Inserting auth clients */
insert into auth_clients
  (client_id, client_secret, secret, redirect_url)
values
  ('test_client_id', 'test_client_secret', 'secret', 'http://localhost:3000/chat');

-- Inserting roles
insert into roles
  (name, permissions, role_type)
values
  ('Admin', '{ViewMessage,CreateMessage,UpdateMessage,DeleteMessage,CreateMessageRecipient,ViewMessageRecipient,UpdateMessageRecipient,DeleteMessageRecipient1,2,3,4,5,6,7,8,CreateAttachmentFile,ViewAttachmentFile,UpdateAttachmentFile,DeleteAttachmentFile}', 0);

insert into roles
  (name, permissions, role_type)
values
  ('Basic', '{ViewMessage,CreateMessage,UpdateMessage,DeleteMessage,CreateMessageRecipient,ViewMessageRecipient,UpdateMessageRecipient,DeleteMessageRecipient1,2,3,4,5,6,7,8,CreateAttachmentFile,ViewAttachmentFile,UpdateAttachmentFile,DeleteAttachmentFile}', 1);

-- Inserting tenants
insert into tenants
  (name, status, key)
values
  ('Master', 1, 'master');

-- Inserting Admin User
insert into users
    (first_name, last_name, username, email, default_tenant_id)
select 'Admin', 'User', 'admin@example.com', 'admin@example.com', id
from tenants
where key = 'master';

insert into user_tenants
    (user_id, tenant_id, status, role_id)
select (select id
    from users
    where username = 'admin@example.com'), (select id
    from tenants
    where key = 'master'), 1, id
from roles
where role_type = 0;

insert into user_credentials
    (user_id, auth_provider, password)
select id, 'internal', '$2a$10$CbtvwMc95POPLBCt6NDVreeXbMPKV2Odnr70M8xGtrRWCbUNRhIFG'
from users
where username = 'admin@example.com';
update users set auth_client_ids = ARRAY[(select id from auth_clients where client_id = 'test_client_id')::integer];


