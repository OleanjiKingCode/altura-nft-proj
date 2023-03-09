export const shortenText = (text: string) => {
  const length = 90;
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};
