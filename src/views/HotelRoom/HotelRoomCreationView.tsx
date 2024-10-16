import { Heading } from "@chakra-ui/react";
import HotelRoomForm from "../../components/HotelRoom/HotelRoomForm";
import PageContainer from "../../layout/PageContainer";
import { HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/hotelRoomService";

const HotelRoomCreationView = () => {
  const addReservation = (newHotelRoom: HotelRoom) => {
    HotelRoomService.createRoom(newHotelRoom);
  };

  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle chambre"}
      </Heading>
      <HotelRoomForm submitFunction={addReservation} />
    </PageContainer>
  );
};

export default HotelRoomCreationView;
