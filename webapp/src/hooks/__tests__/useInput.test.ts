import { act, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import useInput from '../useInput';

describe('useInput hook', () => {
  it('should change value when use onChange function', async () => {
    // given
    const { result } = renderHook(() => useInput());
    const input = 'input';

    // when
    act(() => {
      const event = {
        target: {
          value: input,
        },
      } as ChangeEvent<HTMLInputElement>;

      const [, , handleChange] = result.current;
      handleChange(event);
    });

    //then
    const [value] = result.current;

    expect(value).toEqual(input);
  });
});
