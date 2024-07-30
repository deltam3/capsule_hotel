import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getReservationsAfterDate } from "../../services/apiReservations";

export function useRecentReservations() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: reservations } = useQuery({
    queryFn: () => getReservationsAfterDate(queryDate),
    queryKey: ["reservations", `last-${numDays}`],
  });

  return { isPending, reservations };
}
