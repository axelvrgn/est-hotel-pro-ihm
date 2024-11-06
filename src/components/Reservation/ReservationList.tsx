import { useEffect, useState } from "react";
import { Reservation } from "../../interfaces/Reservation";
import { Container, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { ReservationService } from "../../services/ReservationService";
import ReservationItem from "./ReservationItem";
import ReservationDetailedModal from "./ReservationDetailedModal";
import { useAuth } from "../../contexts/auth";
import { useToasts } from "../../contexts/toast";

// const reservationsTest: Reservation[] = [
//   {
//     id: "1",
//     userSnapShot: {
//       name: "Doe",
//       firstName: "John",
//       numberPhone: "0606060606",
//     },
//     startDate: "2021-10-10",
//     endDate: "2021-10-15",
//     claim: "Claim 1",
//     numberOfChildren: 2,
//     numberOfAdults: 2,
//     pricePaid: 1000,
//     review: 4,
//   },
//   {
//     id: "2",
//     userSnapShot: {
//       name: "Doe",
//       firstName: "Jane",
//       numberPhone: "0606060606",
//     },
//     startDate: "2021-10-10",
//     endDate: "2021-10-15",
//     claim: "Claim 2",
//     numberOfChildren: 2,
//     numberOfAdults: 2,
//     pricePaid: 1000,
//     review: 5,
//   },
// ];

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationsAreLoading, setReservationsAreLoading] =
    useState<boolean>(false);

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

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
    setSelectedReservation(reservation);
    setIsDetailedModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailedModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <>
      {selectedReservation && (
        <ReservationDetailedModal
          reservation={selectedReservation}
          isOpen={isDetailedModalOpen}
          onClose={closeModal}
        />
      )}

      <Container>
        {reservationsAreLoading ? (
          <Spinner />
        ) : (
          <>
            {reservations.length === 0 ? (
              <Text>{"Aucune réservation trouvée"}</Text>
            ) : (
              <SimpleGrid gap={"1.5rem"}>
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
