import { useForm } from "react-hook-form";
import CustomFormControl from "../Form/CustomFormControl";
import CustomInput from "../Form/CustomInput";
import { Button } from "@chakra-ui/react";

interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<ILoginFormValues>();

  return (
    <form>
      <div style={{ display: "flex" }}>
        <CustomFormControl errorField={errors.email}>
          <CustomInput
            type="email"
            name="email"
            register={register}
            placeholder="Identifiant"
          />
        </CustomFormControl>
        <CustomFormControl errorField={errors.password}>
          <CustomInput
            type="password"
            name="password"
            register={register}
            placeholder="Mot de passe"
          />
        </CustomFormControl>
        <Button>Se connecter</Button>
      </div>
    </form>
  );
};

export default LoginForm;
