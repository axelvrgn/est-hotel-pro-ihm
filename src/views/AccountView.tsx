import { Button, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../layout/PageContainer";
import { useAuth } from "../contexts/auth";

const AccountView = () => {
  const { user, removeAuth } = useAuth();

  if (user == null) return null;
  return (
    <PageContainer>
      <Heading>{"Profil"}</Heading>
      <Text>{user.name}</Text>
      <Button onClick={removeAuth} alignSelf={"flex-end"} colorScheme="primary">
        {"Déconnexion"}
      </Button>
    </PageContainer>
  );
};

export default AccountView;
