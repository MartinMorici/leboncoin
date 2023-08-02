import { getLoggedUserId } from '../utils/getLoggedUserId';
import { Conversation } from '../types/conversation';
import Link from 'next/link';

type Props = {
  conversations: Conversation[];
  userId: number;
};

export async function getServerSideProps() {
  const userId = getLoggedUserId();
  const conv = await fetch(`http://localhost:3005/conversations/${userId}`);
  const conversations = await conv.json();

  return {
    props: {
      conversations,
      userId,
    },
  };
}

const Home = ({ conversations, userId }: Props) => {
  console.log(conversations);

  return (
    <main className='container mx-auto'>
      <h1 className='font-bold text-2xl mb-6'>Chats</h1>
      <ul>
        {conversations.map(({senderId, lastMessageTimestamp, recipientNickname, senderNickname, id}) => {
          return (
            <Link key={id} href={`/${id}`}>
              <li className='flex justify-between w-[300px] mb-5'>
                <div className='flex'>
                  <img className='w-14 rounded-full' src="https://i.pravatar.cc/100" alt="" />
                  <h2 className='font-semibold ml-3'>{userId === senderId ? recipientNickname : senderNickname }</h2>
                </div>
                <p>{new Date(Date.now() - lastMessageTimestamp).toLocaleString("es-AR",{hour:"2-digit", minute:"2-digit"})}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default Home;
