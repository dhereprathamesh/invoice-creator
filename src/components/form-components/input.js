import React from "react";
import { Label, TextInput } from "./style";

const Input = ({
  inputRef,
  name,
  type,
  disabled,
  required,
  id,
  defaultValue,
  value,
  error,
  isRequired,
  labelStyle,
  label,
  ...rest
}) => {
  return (
    <div>
      <TextInput
        {...inputRef}
        name={name}
        type={type}
        disabled={disabled}
        required={required}
        placeholder=" "
        id={id}
        defaultValue={defaultValue}
        value={value}
        error={error}
        {...rest}
      />
      <Label htmlFor={name} style={labelStyle}>
        {label}
        {isRequired ? <sup> *</sup> : null}
      </Label>
    </div>
  );
};

export default Input;
