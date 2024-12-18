import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { AccountResponse } from "../../interfaces/Account";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../contexts/auth";

const AccountList = () => {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [accountsAreLoading, setAccountsAreLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const fetchAllAccounts = () => {
    if (user) {
      setAccountsAreLoading(true);
      AuthService.getAllAccounts(user.token)
        .then((accountsRes) => setAccounts(accountsRes.data))
        .finally(() => setAccountsAreLoading(false));
    }
  };

  const handleDelete = (id: string) => {};

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Liste des utilisateurs
      </Heading>
      {accountsAreLoading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {accounts.map((account) => (
            <ListItem
              key={account.firstName}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                {account.firstName} {account.name} ({account.phoneNumber})
              </Box>
              <Button
                colorScheme="red"
                variant={"outline"}
                onClick={() => handleDelete(account.id)}
              >
                Supprimer
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AccountList;
