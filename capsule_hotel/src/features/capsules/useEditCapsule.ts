import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCapsule } from "../../services/apiCapsules";
import { toast } from "react-hot-toast";

export function useEditCapsule() {
  const queryClient = useQueryClient();

  const { mutate: editCapsule, isPending: isEditing } = useMutation({
    mutationFn: ({ newCapsuleData, id }) =>
      createEditCapsule(newCapsuleData, id),
    onSuccess: () => {
      toast.success("캡슐 수정 완료!");
      queryClient.invalidateQueries({ queryKey: ["capsules"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCapsule };
}
