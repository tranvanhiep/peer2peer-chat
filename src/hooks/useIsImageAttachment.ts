const useIsImageAttachment = (type: string) => {
  return /^image\/.*/i.test(type);
};

export default useIsImageAttachment;
