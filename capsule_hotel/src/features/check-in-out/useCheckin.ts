import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservation } from "../../services/apiReservations";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Meal {
  hasMeal?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

interface CheckinParams {
  reservationId: string;
  meal: Meal;
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ reservationId, meal }: CheckinParams) =>
      updateReservation(reservationId, {
        status: "checked-in",
        isPaid: true,
        ...meal,
      }),

    onSuccess: (data) => {
      toast.success(`예약번호 #${data.id} 체크인 완료.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("체크인 중 오류가 발생했습니다."),
  });

  return { checkin, isCheckingIn };
}
