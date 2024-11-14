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
} from "@chakra-ui/react";
import { Reservation } from "../../interfaces/Reservation";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { ReservationService } from "../../services/ReservationService";
import ReservationForm from "./ReservationForm";
import { FormMode } from "../../helpers/FormUtils";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToasts } from "../../contexts/toast";

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
  const { pushToast } = useToasts();

  useEffect(() => {
    fetchReservation();
  }, [reservationId]);

  const fetchReservation = () => {
    if (user) {
      setReservationIsLoading(true);
      ReservationService.getReservationById(user.token, reservationId)
        .then((reservationRes) => setReservation(reservationRes.data[0]))
        .finally(() => setReservationIsLoading(false));
    }
  };

  const updateReservation = () => {};

  const deleteReservation = () => {
    if (user) {
      ReservationService.deleteReservation(user.token, reservationId)
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
        {reservationIsLoading ? (
          <Spinner />
        ) : (
          <>
            {reservation && (
              <>
                <ModalHeader>{`Réservation n°${reservation.id}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={"sm"}
                      colorScheme={"red"}
                      onClick={deleteReservation}
                    >
                      {"Supprimer"}
                    </Button>
                  </div>

                  <Spacer h={6} />

                  <ReservationForm
                    submitFunction={updateReservation}
                    formIsSubmitting={false}
                    formMode={FormMode.MODIFICATION}
                    reservation={reservation}
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

export default ReservationDetailedModal;
