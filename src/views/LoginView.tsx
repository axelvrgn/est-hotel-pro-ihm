import { Box, Heading } from "@chakra-ui/react";
import LoginForm from "../components/Login/LoginForm";
import PageContainer from "../layout/PageContainer";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { Login } from "../interfaces/Login";

const LoginView = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const login = (login: Login) => {
    setFormIsSubmitting(true);

    AuthService.login(login)
      .then(() => {})
      .catch((err) => console.log(err))
      .finally(() => setFormIsSubmitting(false));
  };
  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Connexion"}
      </Heading>
      <Box>
        <LoginForm submitFunction={login} formIsSubmitting={formIsSubmitting} />
      </Box>
    </PageContainer>
  );
};
export default LoginView;
