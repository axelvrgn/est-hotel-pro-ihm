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
import { Reservation } from "../../interfaces/Reservation";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { ReservationService } from "../../services/ReservationService";
import ReservationForm from "./ReservationForm";
import { FormMode } from "../../helpers/FormUtils";

type ReservationDetailedModalProps = {
  reservationId: string;
  isOpen: boolean;
  onClose: () => void;
};

const ReservationDetailedModal = ({
  reservationId,
  isOpen,
  onClose,
}: ReservationDetailedModalProps) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [reservationIsLoading, setReservationIsLoading] =
    useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchReservation();
  }, [reservationId]);

  const fetchReservation = () => {
    if (user) {
      setReservationIsLoading(true);
      ReservationService.getReservationById(user.token, reservationId)
        .then((reservationRes) => setReservation(reservationRes.data))
        .finally(() => setReservationIsLoading(false));
    }
  };

  const updateReservation = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {reservationIsLoading ? (
          <Spinner />
        ) : (
          <>
            {reservation && (
              <>
                <ModalHeader>{`Réservation n°${reservation.id}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ReservationForm
                    submitFunction={updateReservation}
                    formIsSubmitting={false}
                    formMode={FormMode.MODIFICATION}
                    reservation={reservation}
                  />
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
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReservationDetailedModal;
