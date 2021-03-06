import { Chat } from './Chat';
import { ChatItem } from './ChatItem';
import { useChats } from './ChatsContext';

export function ContactsPage({ current }:{current?:Chat}) {
  const { chats } = useChats();
  const values = Object.values(chats);

  return (
    <>
      <div className="title-header">Conversas</div>
      <div className="p-2">
        {values.length
          ? values.map((item:Chat) => (
            <ChatItem chat={item} current={item.userId === current?.userId} />
          ))
          : (
            <div className="pt-6 flex-1 flex items-center justify-center text-slate-600">
              Sem conversas por enquanto
            </div>
          )}
      </div>
    </>
  );
}
