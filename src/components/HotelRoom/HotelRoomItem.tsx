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
import { CategoryRoom, HotelRoom } from "../../interfaces/HotelRoom";

type HotelRoomItemProps = {
  hotelRoom: HotelRoom;
  openDetailedModal: (hotelRoom: HotelRoom) => void;
};

const HotelRoomItem = ({
  hotelRoom,
  openDetailedModal,
}: HotelRoomItemProps) => {
  return (
    <Card size={"sm"}>
      <CardHeader>
        <Heading size="md">{`Chambre n°${hotelRoom.roomNumber}`}</Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns={"repeat(2, 1fr)"}>
          <GridItem>
            <Text>{`${hotelRoom.state}`}</Text>
          </GridItem>
          <GridItem>
            <Text>{`${CategoryRoom[hotelRoom.category]}`}</Text>
          </GridItem>
        </Grid>
      </CardBody>
      <CardFooter>
        <Button
          size={"sm"}
          colorScheme="primary"
          onClick={() => openDetailedModal(hotelRoom)}
        >
          {"voir le détail"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default HotelRoomItem;
