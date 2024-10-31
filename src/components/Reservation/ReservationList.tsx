import { useEffect, useState } from "react";
import { Reservation } from "../../interfaces/Reservation";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { ReservationService } from "../../services/ReservationService";
import ReservationItem from "./ReservationItem";
import ReservationDetailedModal from "./ReservationDetailedModal";

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

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    ReservationService.getAllReservations().then((reservationsRes) =>
      setReservations(reservationsRes.data)
    );
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
        <SimpleGrid gap={"1.5rem"}>
          {reservations.map((reservation) => (
            <ReservationItem
              reservation={reservation}
              openDetailedModal={openDetailedModal}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ReservationList;
