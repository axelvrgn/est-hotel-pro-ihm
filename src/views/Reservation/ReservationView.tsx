import { Button, Heading } from "@chakra-ui/react";
import PageContainer from "../../layout/PageContainer";
import { useNavigate } from "react-router-dom";

const ReservationView = () => {
  const navigate = useNavigate();

  const navigateToCreationReservation = () => {
    navigate("creation");
  };

  return (
    <PageContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>{"Réservations"}</Heading>
        <Button onClick={navigateToCreationReservation} alignSelf={"flex-end"}>
          {"Créer une réservation"}
        </Button>
      </div>
    </PageContainer>
  );
};

export default ReservationView;
