import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
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
        <Heading size="md">{`Réservation n°${reservation.id}`}</Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns={"repeat(2, 1fr)"}>
          <GridItem>
            <Text>{`${reservation.userSnapShot.firstName} ${reservation.userSnapShot.name}`}</Text>
            <div>
              <Text>{`(${reservation.userSnapShot.numberPhone})`}</Text>
            </div>
          </GridItem>
          <GridItem>
            <Text>{`du ${moment(reservation.startDate).format(
              DATE_FORMAT
            )} au ${moment(reservation.endDate).format(DATE_FORMAT)}`}</Text>
          </GridItem>
        </Grid>
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
