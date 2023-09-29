"use client";
import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import FormInput from "./form/FormInput";

const initialFormInput: FormProps = {
  createdAt: "",
  text: "",
  uid: "",
  photoURL: "",
};

interface FormProps {
  createdAt: Date | string;
  text: string;
  uid: string;
  photoURL?: string;
}

// interface AddMessageProps {
//   handleMessage: (obj: FormProps) => void;
//   currentUser: string;
// }

export default function AddMessage({ handleMessage }: any) {
  const [formInput, setFormInput] = useState(initialFormInput);

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        handleMessage(formInput);
        clearForm();
      }}
    >
      <div>
        <FormInput
          type="text"
          name="text"
          value={formInput.text}
          placeholder="Message here"
          onChange={handleInputChange}
          labelText={formInput.uid}
        />
        <Input type="submit" value="Post"></Input>
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  font-size: 1rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  row-gap: 8px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
`;

const Input = styled.input`
  color: black;
  background-color: hsl(358deg 99% 44% /0.3);
  border-radius: 8px;
  letter-spacing: 3px;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  border: 0.5px solid black;
  padding: 8px;
  font-weight: 700;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    color: hsla(204deg 90% 66% / 0.9);
  }
`;
