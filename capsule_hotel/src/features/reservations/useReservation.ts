import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReservation } from "../../services/apiReservations";

export function useReservation() {
  const { reservationId } = useParams();
  const {
    isPending,
    data: reservation,
    error,
  } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: () => getReservation(reservationId),
    retry: false,
  });

  return { isPending, error, reservation };
}
