import { InputRectangle, Label } from "../../app/styles";

interface FormInputProps {
  labelText: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: any;
  value: string;
  autocomplete: string;
}

export default function FormInput({
  labelText,
  name,
  type,
  placeholder,
  onChange,
  value,
  autocomplete,
}: FormInputProps) {
  return (
    <div>
      <Label htmlFor={name}>{labelText}</Label>
      <InputRectangle
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autocomplete}
      />
    </div>
  );
}
