import { getLoggedUserId } from '../utils/getLoggedUserId';
import { Message } from '../types/message';
import { FormEvent, useState } from 'react';
import SendIcon from '../img/send.jsx'
import { Conversation } from '../types/conversation';

type Props = {
  messages: Message[];
  userId: number;
  conversation: string;
};

export async function getServerSideProps({ params: {conversation} }) {
  const userId = getLoggedUserId();
  const mess = await fetch(`http://localhost:3005/messages/${conversation}`);
  const messages = await mess.json();

  return {
    props: {
      messages,
      userId,
      conversation
    },
  };
}

const Home = ({ messages, userId, conversation}: Props) => {
    
    const [message, setMessage] = useState<string>("")

    const handleSubmit = async () => {
        
        await fetch(`http://localhost:3005/messages/${conversation}`, {
          method: "POST",
          body: JSON.stringify({
            body: message,
            authorId: userId,
            conversationId: conversation,
            timestamp: 0,
          }),
          headers: {
            "Content-type": "application/json"
          }
        });
    }

  return (
    <main className='container mx-auto min-h-screen flex flex-col'>
      <h1 className='font-bold text-2xl mb-6'>Messages</h1>
      <ul className='flex flex-col gap-[2px] px-10'>
        {messages.map(({ authorId, body, timestamp,id }) => {
          const messageStyle = authorId === userId ? 'ml-auto text-[#CCDFDB]  bg-[#025C4C] ' : 'bg-[#373737] text-[#CCDFDB] ';
          return (
            <li key={id} className={`${messageStyle} w-[70%] justify-between sm:max-w-[500px] sm:w-fit flex px-2 pb-1 pt-[4px] rounded-md `}>
              <p>{body}</p>
              <div className='ml-1 sm:ml-8 mt-auto text-xs'>{new Date(Date.now() - timestamp).toLocaleString('es-AR', { day: '2-digit', month:'2-digit' })}</div>
            </li>
          );
        })}
      </ul>
      <form className='mt-auto flex ' action='' onSubmit={() => handleSubmit()}>
        <input placeholder='Escribe tu mensaje' className='bg-[#272727] text-white w-full py-3 px-4 border-t-2 border-black outline-none border-none' type='text' value={message} onChange={(e) => setMessage(e.target.value)}  />
        <button className='bg-[#272727] text-white pr-4' type='submit'>
          <SendIcon />
        </button>
      </form>
    </main>
  );
};

export default Home;
