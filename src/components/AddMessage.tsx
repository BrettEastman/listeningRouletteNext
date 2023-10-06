"use client";
import React, { useState, ChangeEvent } from "react";
import FormInput from "./form/FormInput";
import styled from "styled-components";
import { StyledForm, Input } from "../app/styles";

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

// AddMessage is a form that allows the user to add a message to the database. It is then displayed on the Feed page.
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
    <Div>
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
    </Div>
  );
}

const Div = styled.div`
  border-radius: 10px;
  padding: 0.5rem;
  gap: 0.5rem;
`;
