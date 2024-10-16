import { Select } from "@chakra-ui/react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type CustomInputProps = {
  name: Path<FieldValues>;
  register: UseFormRegister<any>;
  placeholder?: string;
  options: string[];
};

const CustomSelect = ({
  name,
  register,
  placeholder,
  options,
}: CustomInputProps) => {
  return (
    <Select {...register(name)} placeholder={placeholder}>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Select>
  );
};

export default CustomSelect;
