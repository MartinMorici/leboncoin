
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { Conversation } from '../types/conversation';

type Props = {
  conversations: Conversation[];
};

export async function getServerSideProps() {
  const userId = getLoggedUserId();
  const conv = await fetch(`http://localhost:3005/conversations/${userId}`);
  const conversations = await conv.json();

  return {
    props: {
      conversations,
    },
  };
}

const Home = ({ conversations }: Props) => {
  console.log(conversations);
  
  return <main>Hola</main>;
};

export default Home;
