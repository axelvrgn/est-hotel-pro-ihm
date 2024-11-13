import { Box, Heading, Spacer } from "@chakra-ui/react";
import PageContainer from "../layout/PageContainer";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useToasts } from "../contexts/toast";
import RegisterForm from "../components/Register/RegisterForm";
import { Account } from "../interfaces/Account";

const RegisterView = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const { pushToast } = useToasts();

  const register = (account: Account) => {
    setFormIsSubmitting(true);

    AuthService.createAccount(account)
      .then((userRes) => {
        console.log(userRes);
      })
      .catch((err) => {
        console.error(err);
        pushToast({
          content: "Erreur lors de l'enregistrement du nouveau compte",
          state: "ERROR",
        });
      })
      .finally(() => setFormIsSubmitting(false));
  };
  return (
    <PageContainer>
      <Box maxWidth={"380px"} style={{ margin: "auto" }}>
        <Heading as="h3" size="lg" textAlign={"center"}>
          {"Connexion"}
        </Heading>
        <Spacer h={6} />
        <RegisterForm
          submitFunction={register}
          formIsSubmitting={formIsSubmitting}
        />
      </Box>
    </PageContainer>
  );
};
export default RegisterView;
