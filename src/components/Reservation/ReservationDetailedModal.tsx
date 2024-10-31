import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Reservation } from "../../interfaces/Reservation";

type ReservationDetailedModalProps = {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
};

const ReservationDetailedModal = ({
  reservation,
  isOpen,
  onClose,
}: ReservationDetailedModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Réservation n°${reservation.id}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <Text>{`Client(e) : ${reservation.userSnapShot.firstName} ${reservation.userSnapShot.name}`}</Text>
            <Text>{`Tel : ${reservation.userSnapShot.numberPhone}`}</Text>
            <Text>{`Dates de réservation : du ${reservation.startDate} au ${reservation.endDate}`}</Text>
            <Text>{`Nombre d'adulte(s) : ${reservation.numberOfAdults}`}</Text>
            <Text>{`Nombre d'enfant(s) : ${reservation.numberOfChildren}`}</Text>
            <Text>{`Informations complémentaires : ${reservation.claim}`}</Text>
            <Text>{`Prix payé : ${reservation.pricePaid} DZD`}</Text>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReservationDetailedModal;
