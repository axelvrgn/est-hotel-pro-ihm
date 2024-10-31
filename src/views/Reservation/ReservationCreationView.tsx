import { Heading } from "@chakra-ui/react";
import ReservationForm from "../../components/Reservation/ReservationForm";
import PageContainer from "../../layout/PageContainer";
import { Reservation } from "../../interfaces/Reservation";
import { ReservationService } from "../../services/ReservationService";
import { useState } from "react";
import { useToasts } from "../../contexts/toast";

const ReservationCreationView = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);

  const { pushToast } = useToasts();

  const createReservation = (newReservation: Reservation) => {
    setFormIsSubmitting(true);
    ReservationService.createReservation(newReservation)
      .then(() => {
        console.log("ok");
        pushToast({
          state: "SUCCESS",
          content: "Réservation créée avec succès",
        });
      })
      .catch(() =>
        pushToast({
          state: "ERROR",
          content: "Erreur lors de la création de la réservation",
        })
      )
      .finally(() => setFormIsSubmitting(false));
  };

  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle réservation"}
      </Heading>

      <ReservationForm
        submitFunction={createReservation}
        formIsSubmitting={formIsSubmitting}
      />
    </PageContainer>
  );
};

export default ReservationCreationView;
