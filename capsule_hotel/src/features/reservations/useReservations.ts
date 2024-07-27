import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../services/apiReservations";

export function useReservations() {
  const {
    isPending,
    data: reservations,
    error,
  } = useQuery({ queryKey: ["reservations"], queryFn: getReservations });

  return { isPending, error, reservations };
}
