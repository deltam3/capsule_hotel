import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservation } from "../../services/apiReservations";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (reservationId: string) =>
      updateReservation(reservationId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`예약번호 #${data.id} 체크아웃 완료.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("체크아웃 중 오류가 발생했습니다."),
  });

  return { checkout, isCheckingOut };
}
