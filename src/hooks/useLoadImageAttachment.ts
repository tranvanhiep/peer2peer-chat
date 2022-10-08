import { useEffect, useState } from 'react';

const useLoadAttachment = (file: File) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(URL.createObjectURL(file));

    return () => {
      if (!url) {
        return;
      }

      URL.revokeObjectURL(url);
    };
  }, [file, url]);

  return url;
};

export default useLoadAttachment;
