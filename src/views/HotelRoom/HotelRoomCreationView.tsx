import { Box, Heading, Spacer } from "@chakra-ui/react";
import HotelRoomForm from "../../components/HotelRoom/HotelRoomForm";
import PageContainer from "../../layout/PageContainer";
import { HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/HotelRoomService";

const HotelRoomCreationView = () => {
  const addReservation = (newHotelRoom: HotelRoom) => {
    HotelRoomService.createRoom(newHotelRoom);
  };

  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle chambre"}
      </Heading>
      <Spacer h={6} />
      <Box>
        <HotelRoomForm submitFunction={addReservation} />
      </Box>
    </PageContainer>
  );
};

export default HotelRoomCreationView;
