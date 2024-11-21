import { Input } from "@chakra-ui/react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type CustomInputProps = {
  name: Path<FieldValues>;
  type: "text" | "number" | "email" | "password" | "date";
  register: UseFormRegister<any>;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
};

const CustomInput = ({
  name,
  type,
  register,
  disabled,
  placeholder,
  min,
}: CustomInputProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      min={min}
      focusBorderColor="primary.300"
      variant={"outline"}
      isDisabled={disabled}
    />
  );
};

export default CustomInput;
