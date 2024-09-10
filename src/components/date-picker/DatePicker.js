import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Controller } from "react-hook-form";

const DatePickerInput = ({
  name,
  label,
  id,
  control,
  placeholderText,
  onChange,
  selected,
}) => {
  return (
    <DateWrap>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            className="datePicker"
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText={placeholderText}
          />
        )}
      />
    </DateWrap>
  );
};

export default DatePickerInput;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -25px;
  gap: 5px;
  label {
    font-family: sans-serif;
    font-size: 12px;
    z-index: 1;
    color: #11555f;
  }
  .header {
    display: flex;
  }

  .datePicker {
    width: 100%;
    padding: 7px;
    font-size: 12px;
    font-weight: 600;
    border: 2px solid #dcdcdc;
    border-radius: 4px;
    min-height: 18px;
  }
`;
