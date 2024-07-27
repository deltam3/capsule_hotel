import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReservation } from "../../services/apiReservations";

export function useReservation() {
  const { reservationId } = useParams();

  const {
    isLoading,
    data: reservation,
    error,
  } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: () => getReservation(reservationId),
    retry: false,
  });

  return { isLoading, error, reservation };
}
