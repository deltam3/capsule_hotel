import ReservationRow from "./ReservationRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useReservations } from "./useReservations";
import Spinner from "../../ui/Spinner";

function ReservationTable() {
  const { reservations, isLoading, count } = useReservations();

  if (isLoading) return <Spinner />;

  if (!reservations.length) return <Empty resourceName="예약" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>캡슐방</div>
          <div>손님</div>
          <div>날짜</div>
          <div>상태</div>
          <div>가격</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={reservations}
          render={(reservation) => (
            <ReservationRow key={reservation.id} reservation={reservation} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ReservationTable;
