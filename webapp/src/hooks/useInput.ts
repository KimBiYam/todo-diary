import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  return [value, handleChange] as const;
};

export default useInput;
