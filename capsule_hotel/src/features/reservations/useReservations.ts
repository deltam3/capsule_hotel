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

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isPending,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations", filter, sortBy],
    queryFn: () => getReservations({ filter, sortBy }),
  });

  return { isPending, error, reservations };
}
