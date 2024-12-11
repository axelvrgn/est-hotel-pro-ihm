import { useEffect, useState } from "react";
import {
  Container,
  Divider,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/HotelRoomService";
import HotelRoomItem from "./HotelRoomItem";
import HotelRoomDetailedModal from "./HotelRoomDetailedModal";
import { useAuth } from "../../contexts/auth";
import { useToasts } from "../../contexts/toast";
import HotelRoomFilters, { SelectedHotelRoomFilters } from "./HotelRoomFilters";

const HotelRoomList = () => {
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  const [hotelRoomsAreLoading, setHotelRoomsAreLoading] =
    useState<boolean>(false);

  const [selectedHotelRoomFilters, setSelectedHotelRoomFilters] =
    useState<SelectedHotelRoomFilters>({
      categoryRoom: "",
      isAvailable: false,
    });

  const [selectedHotelRoomId, setSelectedHotelRoomId] = useState<string | null>(
    null
  );

  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

  const { user } = useAuth();
  const { pushToast } = useToasts();

  useEffect(() => {
    fetchHotelRooms();
  }, [
    selectedHotelRoomFilters.categoryRoom,
    selectedHotelRoomFilters.isAvailable,
  ]);

  const fetchHotelRooms = () => {
    if (user) {
      setHotelRoomsAreLoading(true);
      HotelRoomService.getFilteredRooms(
        user.token,
        selectedHotelRoomFilters.categoryRoom,
        selectedHotelRoomFilters.isAvailable
      )
        .then((hotelRoomsRes) => setHotelRooms(hotelRoomsRes.data))
        .catch(() =>
          pushToast({
            content: "Erreur lors de la récupération des chambres",
            state: "ERROR",
          })
        )
        .finally(() => setHotelRoomsAreLoading(false));
    }
  };

  const openDetailedModal = (hotelRoom: HotelRoom) => {
    setSelectedHotelRoomId(hotelRoom.id);
    setIsDetailedModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailedModalOpen(false);
    setSelectedHotelRoomId(null);
    fetchHotelRooms();
  };

  const applyFilters = (filters: SelectedHotelRoomFilters) => {
    setSelectedHotelRoomFilters(filters);
  };

  return (
    <>
      {selectedHotelRoomId && isDetailedModalOpen && (
        <HotelRoomDetailedModal
          hotelRoomId={selectedHotelRoomId}
          isOpen={isDetailedModalOpen}
          onClose={closeModal}
        />
      )}
      <Container>
        <HotelRoomFilters sendFilters={applyFilters} />
      </Container>

      <Spacer h={6} />

      <Container>
        <Divider />
        <Spacer h={6} />
        {hotelRoomsAreLoading ? (
          <Spinner />
        ) : (
          <>
            {hotelRooms.length === 0 ? (
              <Text>{"Aucune chambre trouvée"}</Text>
            ) : (
              <SimpleGrid gap={"1.5rem"}>
                {hotelRooms.map((hotelRoom) => (
                  <HotelRoomItem
                    key={hotelRoom.id}
                    hotelRoom={hotelRoom}
                    openDetailedModal={openDetailedModal}
                  />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HotelRoomList;
