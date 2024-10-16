import { Button, Heading } from "@chakra-ui/react";
import PageContainer from "../../layout/PageContainer";
import { useNavigate } from "react-router-dom";

const HotelRoomView = () => {
  const navigate = useNavigate();

  const navigateToCreationReservation = () => {
    navigate("creation");
  };

  return (
    <PageContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>{"Chambres"}</Heading>
        <Button onClick={navigateToCreationReservation} alignSelf={"flex-end"}>
          {"Ajouter une chambre"}
        </Button>
      </div>
    </PageContainer>
  );
};

export default HotelRoomView;
