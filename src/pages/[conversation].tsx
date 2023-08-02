import { getLoggedUserId } from '../utils/getLoggedUserId';
import { Message } from '../types/message';
import { FormEvent, useState } from 'react';

type Props = {
  messages: Message[];
  userId: number;
};

export async function getServerSideProps({ params: conversation }) {
  const userId = getLoggedUserId();
  const mess = await fetch(`http://localhost:3005/messages/${userId}`);
  const messages = await mess.json();

  return {
    props: {
      messages,
      userId,
    },
  };
}

const Home = ({ messages, userId }: Props) => {
    const [message, setMessage] = useState<string>("")

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <main className='container mx-auto min-h-screen flex flex-col'>
      <h1 className='font-bold text-2xl mb-6'>Messages</h1>
      <ul className='flex flex-col gap-[2px] px-10'>
        {messages.map(({ authorId, body, timestamp }) => {
          const messageStyle = authorId === userId ? 'ml-auto text-[#CCDFDB]  bg-[#025C4C] ' : 'bg-[#373737] text-[#CCDFDB] ';
          return (
            <li className={`${messageStyle} w-[70%] sm:max-w-[500px]  flex px-2 pb-1 pt-[4px] rounded-md `}>
              <p>{body}</p>
              <div className='ml-1 sm:ml-8 mt-auto text-xs'>{new Date(Date.now() - timestamp).toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit' })}</div>
            </li>
          );
        })}
      </ul>
      <form className='mt-auto flex ' action='' onSubmit={(e) => handleSubmit(e)}>
        <input placeholder='Escribe tu mensaje' className='bg-[#272727] text-white w-full py-3 px-4 border-t-2 border-black outline-none border-none' type='text' value={message} onChange={(e) => setMessage(e.target.value)}  />
        <button className='bg-[#272727] text-white pr-4' type='submit'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-6 h-6'> <path stroke-linecap='round' stroke-linejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' /> </svg>
        </button>
      </form>
    </main>
  );
};

export default Home;
