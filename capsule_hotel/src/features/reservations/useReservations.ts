import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../services/apiReservations";
import { useSearchParams } from "react-router-dom";

export function useReservations() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isPending,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations", filter],
    queryFn: () => getReservations({ filter }),
  });

  return { isPending, error, reservations };
}
