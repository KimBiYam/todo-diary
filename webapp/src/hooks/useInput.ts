import { ChangeEvent, useCallback, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return [value, handleChange] as const;
};

export default useInput;
