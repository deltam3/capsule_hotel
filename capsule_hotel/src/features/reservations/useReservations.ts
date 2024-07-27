import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReservations } from "../../services/apiReservations";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useReservations() {
  const queryClient = useQueryClient();
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
  const safeCount = count ?? 0;
  const pageCount = Math.ceil(safeCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["reservations", filter, sortBy, page + 1],
      queryFn: () => getReservations({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["reservations", filter, sortBy, page - 1],
      queryFn: () => getReservations({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, error, reservations, count };
}
