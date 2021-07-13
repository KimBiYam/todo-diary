import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return [value, onChange] as const;
};

export default useInput;
