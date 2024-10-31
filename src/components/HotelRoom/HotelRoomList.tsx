import { useEffect, useState } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/HotelRoomService";
import HotelRoomItem from "./HotelRoomItem";
import HotelRoomDetailedModal from "./HotelRoomDetailedModal";

// const hotelRoomsTest: HotelRoom[] = [
//   {
//     id: "room1",
//     roomNumber: 1,
//     price: 1000,
//     category: CategoryRoom.GRAND_LIT_CONFORT,
//     state: "Disponible",
//   },
//   {
//     id: "room2",
//     roomNumber: 2,
//     price: 2000,
//     category: CategoryRoom.TRIPLE_LIT_STANDARD,
//     state: "Disponible",
//   },
// ];

const HotelRoomList = () => {
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);

  const [selectedHotelRoom, setSelectedHotelRoom] = useState<HotelRoom | null>(
    null
  );

  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

  useEffect(() => {
    fetchHotelRooms();
  }, []);

  const fetchHotelRooms = () => {
    HotelRoomService.getAllRooms().then((hotelRoomsRes) =>
      setHotelRooms(hotelRoomsRes.data)
    );
  };

  const openDetailedModal = (hotelRoom: HotelRoom) => {
    setSelectedHotelRoom(hotelRoom);
    setIsDetailedModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailedModalOpen(false);
    setSelectedHotelRoom(null);
  };

  return (
    <>
      {selectedHotelRoom && (
        <HotelRoomDetailedModal
          hotelRoom={selectedHotelRoom}
          isOpen={isDetailedModalOpen}
          onClose={closeModal}
        />
      )}

      <Container>
        {hotelRooms.length === 0 ? (
          <p>{"Aucune chambre trouvée"}</p>
        ) : (
          <SimpleGrid gap={"1.5rem"}>
            {hotelRooms.map((hotelRoom) => (
              <HotelRoomItem
                hotelRoom={hotelRoom}
                openDetailedModal={openDetailedModal}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default HotelRoomList;
