import { useForm } from "react-hook-form";
import CustomFormControl from "../Form/CustomFormControl";
import CustomInput from "../Form/CustomInput";
import { Button } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CHAMP_OBLIGATOIRE } from "../../data/constants";

interface ILoginFormValues {
  email: string;
  password: string;
}

const loginFormValidationSchema = yup.object().shape({
  email: yup.string().email().required(CHAMP_OBLIGATOIRE),
  password: yup.string().required(CHAMP_OBLIGATOIRE),
});

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    mode: "onBlur",
    resolver: yupResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: ILoginFormValues) => {
    return values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CustomFormControl label="Identifiant" errorField={errors.email}>
          <CustomInput
            type="email"
            name="email"
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
        <Button type="submit">{"Se connecter"}</Button>
      </div>
    </form>
  );
};

export default LoginForm;
