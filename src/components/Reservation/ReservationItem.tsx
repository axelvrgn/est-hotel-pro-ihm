import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Tag,
} from "@chakra-ui/react";
import { Reservation } from "../../interfaces/Reservation";
import moment from "moment";
import { DATE_FORMAT } from "../../data/constants";

type ReservationItemProps = {
  reservation: Reservation;
  openDetailedModal: (reservation: Reservation) => void;
};

const ReservationItem = ({
  reservation,
  openDetailedModal,
}: ReservationItemProps) => {
  return (
    <Card size={"sm"}>
      <CardHeader>
        <Heading size="md">{`Réservation de ${reservation.userSnapshot.name} ${reservation.userSnapshot.firstName}`}</Heading>
      </CardHeader>
      <CardBody>
        <Flex flexWrap={"wrap"} gap={"0.8rem"}>
          <Tag>{`${moment(reservation.startDate).format(
            DATE_FORMAT
          )} - ${moment(reservation.endDate).format(DATE_FORMAT)}`}</Tag>
          <Tag>{`${reservation.hotelRoom.category}`}</Tag>
          <Tag>{`Adulte(s): ${reservation.numberOfAdults}`}</Tag>
          {reservation.numberOfChildren > 0 && (
            <Tag>{`Enfant(s): ${reservation.numberOfChildren}`}</Tag>
          )}
        </Flex>
      </CardBody>
      <CardFooter>
        <Button
          size={"sm"}
          colorScheme="primary"
          onClick={() => openDetailedModal(reservation)}
        >
          {"voir le détail"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ReservationItem;
