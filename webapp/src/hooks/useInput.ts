import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (deafultValue?: string) => {
  const [value, setValue] = useState(deafultValue ?? '');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return [value, setValue, handleChange] as const;
};

export default useInput;
