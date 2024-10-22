import { Box, Heading, Spacer } from "@chakra-ui/react";
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
      <Box maxWidth={"380px"} style={{ margin: "auto" }}>
        <Heading as="h3" size="lg" textAlign={"center"}>
          {"Connexion"}
        </Heading>
        <Spacer h={6} />
        <LoginForm submitFunction={login} formIsSubmitting={formIsSubmitting} />
      </Box>
    </PageContainer>
  );
};
export default LoginView;
