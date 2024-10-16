import { Heading } from "@chakra-ui/react";
import HotelRoomForm from "../../components/HotelRoom/HotelRoomForm";
import PageContainer from "../../layout/PageContainer";

const HotelRoomCreationView = () => {
  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle chambre"}
      </Heading>
      <HotelRoomForm />
    </PageContainer>
  );
};

export default HotelRoomCreationView;
