import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

type FormControlProps = {
  children: React.ReactNode;
  errorField?: FieldError;
};

const CustomFormControl = ({ children, errorField }: FormControlProps) => {
  return (
    <FormControl isInvalid={!!errorField}>
      {children}
      <FormErrorMessage>{errorField && errorField.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomFormControl;
