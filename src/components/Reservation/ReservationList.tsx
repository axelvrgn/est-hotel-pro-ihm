import { useEffect, useState } from "react";
import { Reservation } from "../../interfaces/Reservation";
import {
  Container,
  Divider,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ReservationService } from "../../services/ReservationService";
import ReservationItem from "./ReservationItem";
import ReservationDetailedModal from "./ReservationDetailedModal";
import { useAuth } from "../../contexts/auth";
import { useToasts } from "../../contexts/toast";

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationsAreLoading, setReservationsAreLoading] =
    useState<boolean>(false);

  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);

  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

  const { user } = useAuth();
  const { pushToast } = useToasts();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    if (user) {
      setReservationsAreLoading(true);
      ReservationService.getAllReservations(user.token)
        .then((reservationsRes) => {
          setReservations(reservationsRes.data);
        })
        .catch(() =>
          pushToast({
            content: "Erreur lors de la récupération des réservations",
            state: "ERROR",
          })
        )
        .finally(() => setReservationsAreLoading(false));
    }
  };

  const openDetailedModal = (reservation: Reservation) => {
    setSelectedReservationId(reservation.id);
    setIsDetailedModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailedModalOpen(false);
    setSelectedReservationId(null);
    fetchReservations();
  };

  return (
    <>
      {selectedReservationId && (
        <ReservationDetailedModal
          reservationId={selectedReservationId}
          isOpen={isDetailedModalOpen}
          onClose={closeModal}
        />
      )}

      <Container maxW={"container.xl"}>
        <Divider />
        <Spacer h={6} />
        {reservationsAreLoading ? (
          <Spinner />
        ) : (
          <>
            {reservations.length === 0 ? (
              <Text>{"Aucune réservation trouvée"}</Text>
            ) : (
              <SimpleGrid columns={3} spacing={6}>
                {reservations.map((reservation) => (
                  <ReservationItem
                    key={reservation.id}
                    reservation={reservation}
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

export default ReservationList;
