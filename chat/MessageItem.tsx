import { useUser } from '../auth/UserContext';
import { Message } from './Message';

export function MessageItem({ message }:{message:Message}) {
  const { user } = useUser();
  return (
    <div className={`py-1 px-2 rounded-lg break-all ${
      message.senderId === user?.id
        ? 'bg-green-100 self-end'
        : 'bg-gray-200 self-start'} `}
    >
      {message.text}
    </div>
  );
}
