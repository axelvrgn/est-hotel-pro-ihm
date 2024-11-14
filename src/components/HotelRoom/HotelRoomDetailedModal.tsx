import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CategoryRoom, HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/HotelRoomService";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import HotelRoomForm from "./HotelRoomForm";
import { FormMode } from "../../helpers/FormUtils";

type HotelRoomDetailedModalProps = {
  hotelRoomId: string;
  isOpen: boolean;
  onClose: () => void;
};

const HotelRoomDetailedModal = ({
  hotelRoomId,
  isOpen,
  onClose,
}: HotelRoomDetailedModalProps) => {
  const [hotelRoom, setHotelRoom] = useState<HotelRoom | null>(null);
  const [hotelRoomIsLoading, setHotelRoomIsLoading] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchHotelRoom();
  }, [hotelRoomId]);

  const fetchHotelRoom = () => {
    if (user) {
      setHotelRoomIsLoading(true);
      HotelRoomService.getRoomById(user.token, hotelRoomId)
        .then((hotelRoomRes) => setHotelRoom(hotelRoomRes.data))
        .finally(() => setHotelRoomIsLoading(false));
    }
  };

  const updateRoom = () => {
    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {hotelRoomIsLoading ? (
          <Spinner />
        ) : (
          <>
            {hotelRoom && (
              <>
                <ModalHeader>{`Chambre n°${hotelRoom.roomNumber}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <HotelRoomForm
                    submitFunction={updateRoom}
                    formIsSubmitting={false}
                    formMode={FormMode.MODIFICATION}
                    hotelRoom={hotelRoom}
                  />
                  <div>
                    <Text>{`Statut : ${hotelRoom.state}`}</Text>
                    <Text>{`Catégorie : ${
                      CategoryRoom[hotelRoom.category]
                    }`}</Text>
                    <Text>{`Prix : ${hotelRoom.price} DZD`}</Text>
                  </div>
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HotelRoomDetailedModal;
