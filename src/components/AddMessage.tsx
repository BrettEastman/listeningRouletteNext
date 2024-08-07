"use client";
import { ChangeEvent, useState } from "react";
import { Form, Input, Stack } from "../app/styles";
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
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleMessage(formInput);
        clearForm();
      }}
    >
      <Stack gap="1rem">
        <FormInput
          type="text"
          name="text"
          value={formInput.text}
          placeholder="Message here"
          onChange={handleInputChange}
          labelText={formInput.uid}
          autocomplete="on"
        />
        <div>
          <Input type="submit" value="Post"></Input>
        </div>
      </Stack>
    </Form>
  );
}
