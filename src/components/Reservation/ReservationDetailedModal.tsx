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
  Image,
} from "@chakra-ui/react";
import { CreateReservation, Reservation } from "../../interfaces/Reservation";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { ReservationService } from "../../services/ReservationService";
import ReservationForm from "./ReservationForm";
import { FormMode } from "../../helpers/FormUtils";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToasts } from "../../contexts/toast";
import { HotelRoom } from "../../interfaces/HotelRoom";

type ReservationDetailedModalProps = {
  reservationId: string;
  isOpen: boolean;
  onClose: () => void;
  hotelRooms: HotelRoom[];
};

const ReservationDetailedModal = ({
  reservationId,
  isOpen,
  onClose,
  hotelRooms,
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

  const updateReservation = (updatedReservation: CreateReservation) => {
    if (user) {
      ReservationService.updateReservation(
        user.token,
        reservationId,
        updatedReservation
      )
        .then(() => {
          pushToast({
            content: "Réservation modifiée avec succès",
            state: "SUCCESS",
          });
          onClose();
        })
        .catch(() => {
          pushToast({
            content: "Erreur lors de la modification de la réservation",
            state: "ERROR",
          });
        });
    }
  };

  const deleteReservation = () => {
    if (user && reservation) {
      ReservationService.deleteReservation(user.token, reservationId)
        .then(() => {
          pushToast({
            content: `Réservation de ${reservation.userSnapshot.firstName} ${reservation.userSnapshot.name} supprimée avec succès`,
            state: "SUCCESS",
          });
          onClose();
        })
        .catch(() => {
          pushToast({
            content: "Erreur lors de la suppression de la réservation",
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
                <ModalHeader>{`Réservation de ${reservation.userSnapshot.firstName} ${reservation.userSnapshot.name}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Image
                    src={reservation.hotelRoom.imageUrl}
                    borderRadius="sm"
                  />

                  <Spacer h={6} />

                  {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size={"sm"}
                      colorScheme={"red"}
                      onClick={deleteReservation}
                    >
                      <DeleteIcon />
                    </Button>
                  </div> */}

                  <Spacer h={6} />

                  <ReservationForm
                    submitFunction={updateReservation}
                    formIsSubmitting={false}
                    formMode={FormMode.MODIFICATION}
                    allRooms={hotelRooms}
                    reservation={reservation}
                  />

                  <Spacer h={6} />

                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={"sm"}
                      colorScheme={"red"}
                      onClick={deleteReservation}
                      variant={"outline"}
                    >
                      {"Supprimer"}
                    </Button>
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
