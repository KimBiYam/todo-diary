const useTextSliceToBytes = (text: string, maxBytes: number) => {
  let buffer = 0;
  let index = 0;

  if (Buffer.byteLength(text) < maxBytes) {
    return text;
  }

  while (true) {
    const unicode = text.charCodeAt(index);
    buffer += unicode > 127 ? 2 : 1;

    if (buffer > maxBytes) {
      break;
    }

    index++;
  }

  return `${text.substring(0, index)}...`;
};

export default useTextSliceToBytes;
