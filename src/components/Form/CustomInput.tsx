import { Input } from "@chakra-ui/react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type CustomInputProps = {
  name: Path<FieldValues>;
  type: "text" | "number" | "email" | "password" | "date";
  register: UseFormRegister<any>;
  placeholder?: string;
  min?: number;
};

const CustomInput = ({
  name,
  type,
  register,
  placeholder,
  min,
}: CustomInputProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      min={min}
    />
  );
};

export default CustomInput;
