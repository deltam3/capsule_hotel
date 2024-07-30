import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface Reservation {
  totalPrice: number;
}

interface ConfirmedStay {
  numNights: number;
}

interface StatsProps {
  reservations: Reservation[];
  confirmedStays: ConfirmedStay[];
  numDays: number;
  capsuleCount: number;
}

function Stats({
  reservations,
  confirmedStays,
  numDays,
  capsuleCount,
}: StatsProps) {
  const numReservations = reservations.length;

  const sales = reservations.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * capsuleCount);

  return (
    <>
      <Stat
        title="총 예약"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numReservations}
      />
      <Stat
        title="매출액"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="현재 사용 중인 캡슐 수"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="객실 점유율"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
