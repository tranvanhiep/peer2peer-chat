import { useEffect } from 'react';

const useLoadAttachment = (file: File) => {
  const url = URL.createObjectURL(file);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
};

export default useLoadAttachment;
