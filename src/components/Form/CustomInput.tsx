import { Input } from "@chakra-ui/react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type CustomInputProps = {
  name: Path<FieldValues>;
  type: "text" | "number" | "email" | "password" | "date";
  register: UseFormRegister<any>;
  placeholder?: string;
  fieldError?: FieldError;
};

const CustomInput = ({
  name,
  type,
  register,
  placeholder,
}: CustomInputProps) => {
  return <Input type={type} placeholder={placeholder} {...register(name)} />;
};

export default CustomInput;
