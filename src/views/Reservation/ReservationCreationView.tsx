import { Heading } from "@chakra-ui/react";
import ReservationForm from "../../components/Reservation/ReservationForm";
import PageContainer from "../../layout/PageContainer";
import { Reservation } from "../../interfaces/Reservation";
import { ReservationService } from "../../services/ReservationService";
import { useState } from "react";
import { useToasts } from "../../contexts/toast";
import { useAuth } from "../../contexts/auth";
import { FormMode } from "../../helpers/FormUtils";

const ReservationCreationView = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);

  const { pushToast } = useToasts();
  const { user } = useAuth();

  const createReservation = (newReservation: Reservation) => {
    if (user) {
      setFormIsSubmitting(true);
      ReservationService.createReservation(user.token, newReservation)
        .then(() => {
          pushToast({
            state: "SUCCESS",
            content: "Nouvelle réservation créée avec succès",
          });
        })
        .catch(() =>
          pushToast({
            state: "ERROR",
            content: "Erreur lors de la création de la réservation",
          })
        )
        .finally(() => setFormIsSubmitting(false));
    }
  };

  return (
    <PageContainer>
      <Heading as="h3" size="lg">
        {"Nouvelle réservation"}
      </Heading>

      <ReservationForm
        submitFunction={createReservation}
        formIsSubmitting={formIsSubmitting}
        formMode={FormMode.CREATION}
      />
    </PageContainer>
  );
};

export default ReservationCreationView;
