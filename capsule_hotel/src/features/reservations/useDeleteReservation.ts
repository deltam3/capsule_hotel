import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteReservation as deleteReservationApi } from "../../services/apiReservations";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteReservation } = useMutation({
    mutationFn: deleteReservationApi,
    onSuccess: () => {
      toast.success("예약 삭제 완료.");

      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteReservation };
}
