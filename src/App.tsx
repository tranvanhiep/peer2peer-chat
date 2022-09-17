import { ChatBox, Layout, MessageGroup } from '@components/index';

function App() {
  return (
    <Layout>
      <MessageGroup
        name="John Doe"
        type={0}
        content="Lorem ipsum dolor sit amet\n consectetur adipisicing elit.\n Nisi, expedita!"
      />
      <MessageGroup
        name="Alice"
        type={1}
        content="Lorem ipsum dolor sit amet\n consectetur adipisicing elit.\n Nisi, expedita!"
      />
      <ChatBox />
    </Layout>
  );
}

export default App;
