import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CategoryRoom, HotelRoom } from "../../interfaces/HotelRoom";

type HotelRoomDetailedModalProps = {
  hotelRoom: HotelRoom;
  isOpen: boolean;
  onClose: () => void;
};

const HotelRoomDetailedModal = ({
  hotelRoom,
  isOpen,
  onClose,
}: HotelRoomDetailedModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Chambre n°${hotelRoom.roomNumber}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <Text>{`Statut : ${hotelRoom.state}`}</Text>
            <Text>{`Catégorie : ${CategoryRoom[hotelRoom.category]}`}</Text>
            <Text>{`Prix : ${hotelRoom.price} DZD`}</Text>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HotelRoomDetailedModal;
