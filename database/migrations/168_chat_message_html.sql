-- 168: Formatted chat messages (bold, italic, lists, links... from the chat composer's toolbar).
-- message_html: the formatted version, cleaned on the server (backend/app/Utils/ChatHtml.php); NULL for a
-- plain message. `message` keeps the plain text of every message, as before, for previews, search,
-- notifications and older apps. Existing messages are untouched. ChatService also adds the column
-- itself the first time a formatted message is sent, if this has not been run.
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS message_html MEDIUMTEXT NULL AFTER message;
