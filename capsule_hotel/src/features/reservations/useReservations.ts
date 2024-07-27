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

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data: reservations, count } = {},
    error,
  } = useQuery({
    queryKey: ["reservations", filter, sortBy, page],
    queryFn: () => getReservations({ filter, sortBy, page }),
  });

  return { isPending, error, reservations, count };
}
