import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCapsule as deleteCapsuleApi } from "../../services/apiCapsules";

export function useDeleteCapsule() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCapsule } = useMutation({
    mutationFn: deleteCapsuleApi,
    onSuccess: () => {
      toast.success("캡슐 삭제 완료");

      queryClient.invalidateQueries({
        queryKey: ["capsules"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCapsule };
}
