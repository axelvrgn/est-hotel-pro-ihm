import { Box } from "@chakra-ui/react";
import LoginForm from "../components/Login/LoginForm";
import PageContainer from "../layout/PageContainer";

const LoginView = () => {
  return (
    <PageContainer>
      <Box>
        <LoginForm />
      </Box>
    </PageContainer>
  );
};
export default LoginView;
