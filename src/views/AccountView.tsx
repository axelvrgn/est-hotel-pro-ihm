import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import PageContainer from "../layout/PageContainer";
import { useAuth } from "../contexts/auth";
import { PhoneIcon } from "@chakra-ui/icons";

const AccountView = () => {
  const { user, removeAuth } = useAuth();

  if (user == null) return null;
  return (
    <PageContainer>
      <Card size={"md"}>
        <CardHeader>
          <Heading size="md">
            {`Profil de ${user.accountResponse.firstName} ${user.accountResponse.name}`}
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex direction={"column"} gap={"1rem"}>
            <Tag>{`${user.accountResponse.role}`}</Tag>
            <Tag>
              <TagLeftIcon boxSize="12px" as={PhoneIcon} />
              <TagLabel>{`${user.accountResponse.phoneNumber}`}</TagLabel>
            </Tag>
          </Flex>
        </CardBody>
        <CardFooter>
          <Button
            onClick={removeAuth}
            alignSelf={"flex-end"}
            colorScheme="red"
            size={"sm"}
          >
            {"Déconnexion"}
          </Button>
        </CardFooter>
      </Card>
    </PageContainer>
  );
};

export default AccountView;
