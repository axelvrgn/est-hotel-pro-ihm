import { Box, Heading, Spacer } from "@chakra-ui/react";
import PageContainer from "../layout/PageContainer";
import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useToasts } from "../contexts/toast";
import RegisterForm from "../components/Register/RegisterForm";
import { CreateAccount } from "../interfaces/Account";
import { useAuth } from "../contexts/auth";

const RegisterView = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const { pushToast } = useToasts();
  const { user } = useAuth();

  const register = (newAccount: CreateAccount) => {
    if (user) {
      setFormIsSubmitting(true);

      AuthService.createAccount(user.token, newAccount)
        .then(() => {
          pushToast({
            content: "Utilisateur ajouté avec succès",
            state: "SUCCESS",
          });
        })
        .catch(() => {
          pushToast({
            content: "Erreur lors de l'enregistrement du nouveau compte",
            state: "ERROR",
          });
        })
        .finally(() => setFormIsSubmitting(false));
    }
  };
  return (
    <PageContainer>
      <Box maxWidth={"380px"} style={{ margin: "auto" }}>
        <Heading as="h3" size="lg" textAlign={"center"}>
          {"Création d'un compte"}
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
