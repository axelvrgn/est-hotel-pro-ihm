import { Heading } from "@chakra-ui/react";
import ReservationForm from "../../components/Reservation/ReservationForm";
import PageContainer from "../../layout/PageContainer";

const ReservationCreationView = () => {
  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle réservation"}
      </Heading>

      <ReservationForm />
    </PageContainer>
  );
};

export default ReservationCreationView;
