import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CategoryRoom, HotelRoom } from "../../interfaces/HotelRoom";
import { HotelRoomService } from "../../services/HotelRoomService";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import HotelRoomForm from "./HotelRoomForm";
import { FormMode } from "../../helpers/FormUtils";
import { useToasts } from "../../contexts/toast";
import { DeleteIcon } from "@chakra-ui/icons";

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
  const { pushToast } = useToasts();

  useEffect(() => {
    fetchHotelRoom();
  }, [hotelRoomId]);

  const fetchHotelRoom = () => {
    if (user) {
      setHotelRoomIsLoading(true);
      HotelRoomService.getRoomById(user.token, hotelRoomId)
        .then((hotelRoomRes) => setHotelRoom(hotelRoomRes.data[0]))
        .finally(() => setHotelRoomIsLoading(false));
    }
  };

  const updateRoom = () => {
    return null;
  };

  const deleteRoom = () => {
    if (user) {
      HotelRoomService.deleteRoom(user.token, hotelRoomId)
        .then(() => {
          pushToast({
            content: "Chambre supprimée avec succès",
            state: "SUCCESS",
          });
          onClose();
        })
        .catch(() => {
          pushToast({
            content: "Erreur lors de la suppression de la chambre",
            state: "ERROR",
          });
        });
    }
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={"sm"}
                      colorScheme={"red"}
                      onClick={deleteRoom}
                    >
                      {"Supprimer"}
                    </Button>
                  </div>

                  <Spacer h={6} />

                  <HotelRoomForm
                    submitFunction={updateRoom}
                    formIsSubmitting={false}
                    formMode={FormMode.MODIFICATION}
                    hotelRoom={hotelRoom}
                  />
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
