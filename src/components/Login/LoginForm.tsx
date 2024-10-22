import { useForm } from "react-hook-form";
import CustomFormControl from "../Form/CustomFormControl";
import CustomInput from "../Form/CustomInput";
import { Button, Spacer } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CHAMP_OBLIGATOIRE } from "../../data/constants";
import { Login } from "../../interfaces/Login";

interface ILoginFormValues {
  identifiant: string;
  password: string;
}

const loginFormValidationSchema = yup.object().shape({
  identifiant: yup.string().required(CHAMP_OBLIGATOIRE),
  password: yup.string().required(CHAMP_OBLIGATOIRE),
});

type LoginFormProps = {
  submitFunction: (login: Login) => void;
  formIsSubmitting: boolean;
};

const LoginForm = ({ submitFunction, formIsSubmitting }: LoginFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    mode: "onBlur",
    resolver: yupResolver(loginFormValidationSchema),
  });

  const onSubmit = (values: ILoginFormValues) => {
    const login: Login = {
      name: values.identifiant,
      password: values.password,
    };
    submitFunction(login);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <CustomFormControl label="Identifiant" errorField={errors.identifiant}>
          <CustomInput
            type="text"
            name="identifiant"
            register={register}
            placeholder="Identifiant"
          />
        </CustomFormControl>
        <CustomFormControl label="Mot de passe" errorField={errors.password}>
          <CustomInput
            type="password"
            name="password"
            register={register}
            placeholder="Mot de passe"
          />
        </CustomFormControl>
      </div>
      <Spacer height={"20px"} />
      <Button
        type="submit"
        colorScheme={"primary"}
        isLoading={formIsSubmitting}
      >
        {"Se connecter"}
      </Button>
    </form>
  );
};

export default LoginForm;
