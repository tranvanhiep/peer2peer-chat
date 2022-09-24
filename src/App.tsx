import { ChatBox, Layout, MessageGroup, Modal } from '@components/index';
import { useEffect, useState } from 'react';

function App() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const name = localStorage.getItem('name');

    if (!name?.trim()) {
      setOpen(true);
    }

    return () => localStorage.removeItem('name');
  }, [setOpen]);

  return (
    <>
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
      <Modal open={open} />
    </>
  );
}

export default App;
