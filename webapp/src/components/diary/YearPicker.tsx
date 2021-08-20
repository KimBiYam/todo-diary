import { css } from '@emotion/react';
import React, { memo } from 'react';
import { COLORS } from '../../constants';

export type YearPickerProps = {
  minYear: number;
  maxYear: number;
  onChange: (year: number) => void;
};

const YearPicker = ({ minYear, maxYear, onChange }: YearPickerProps) => {
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectYear = parseInt(e.target.value);

    onChange(selectYear);
  };

  return (
    <select css={select} onChange={handleChangeSelect}>
      {Array.from({ length: maxYear - minYear + 1 }).map((_, index) => {
        return (
          <option key={maxYear - index} value={maxYear - index}>
            {maxYear - index}
          </option>
        );
      })}
    </select>
  );
};

const select = css`
  border: none;
  background: none;
  font-size: 2rem;
  color: ${COLORS.quaternary};
  text-decoration: underline;
  cursor: pointer;
  appearance: none;
`;

export default memo(YearPicker);
