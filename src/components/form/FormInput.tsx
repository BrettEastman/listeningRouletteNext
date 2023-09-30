import React from "react";
import styled from "styled-components";
import { Label, Input2 } from "../../app/styles";

interface FormInputProps {
  labelText: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: any;
  value: string;
}

export default function FormInput({
  labelText,
  name,
  type,
  placeholder,
  onChange,
  value,
}: FormInputProps) {
  return (
    <div>
      <Label htmlFor={name}>{labelText}</Label>
      <Input2
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
