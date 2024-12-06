import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { Reservation } from "../../interfaces/Reservation";
import moment from "moment";
import { DATE_FORMAT } from "../../data/constants";
import { CATEGORY_ROOM_LABELS } from "../../data/HotelRoom";
import { RESERVATION_STATUS_LABELS } from "../../data/Reservation";

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
          <Tag>{`Début ${moment(reservation.startDate).format(
            DATE_FORMAT
          )}`}</Tag>
          <Tag>{`Fin ${moment(reservation.endDate).format(DATE_FORMAT)}`}</Tag>
        </Flex>
        <Spacer height={"0.8rem"} />
        <Flex flexWrap={"wrap"} gap={"0.8rem"}>
          <Tag>{`${RESERVATION_STATUS_LABELS[reservation.status]}`}</Tag>

          <Tag>{`${CATEGORY_ROOM_LABELS[reservation.hotelRoom.category]}`}</Tag>
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
