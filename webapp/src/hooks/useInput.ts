import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue ?? '');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return [value, setValue, handleChange] as const;
};

export default useInput;
