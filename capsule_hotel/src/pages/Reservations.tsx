import ReservationTable from "../features/reservations/ReservationTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Reservations() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">모든 예약들</Heading>
      </Row>

      <ReservationTable></ReservationTable>
    </>
  );
}

export default Reservations;
