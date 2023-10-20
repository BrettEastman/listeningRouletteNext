"use client";
import { ChangeEvent, useState } from "react";
import { Form, Input, Subtitle } from "../app/styles";
import FormInput from "./form/FormInput";

const initialFormInput = {
  _id: "",
  name: "",
  album: "",
};

interface FormProps {
  handleSubmit: any;
  currentUserId: string;
}

// AddAlbum is a form that allows the user to add an album to the database. It is then displayed on the home page.
export default function AddAlbum({ handleSubmit, currentUserId }: FormProps) {
  const [formInput, setFormInput] = useState(initialFormInput);

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      _id: currentUserId,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(formInput);
        clearForm();
      }}
    >
      <Subtitle>Enter your pick!</Subtitle>
      <div>
        <FormInput
          labelText="Name"
          type="text"
          name="name"
          value={formInput.name}
          placeholder="Enter artist name"
          onChange={handleInputChange}
        />
        <br />
        <FormInput
          labelText="Album"
          type="text"
          name="album"
          value={formInput.album}
          placeholder="Enter album name"
          onChange={handleInputChange}
        />
        <br />
        <Input type="submit" value="Submit"></Input>
      </div>
    </Form>
  );
}
