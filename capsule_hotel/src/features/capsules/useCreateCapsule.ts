import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCapsule } from "../../services/apiCapsules";

export function useCreateCapsule() {
  const queryClient = useQueryClient();

  const { mutate: createCapsule, isPending: isCreating } = useMutation({
    mutationFn: createEditCapsule,
    onSuccess: () => {
      toast.success("새로운 캡슐방 생성 완료");
      queryClient.invalidateQueries({ queryKey: ["capsules"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCapsule };
}
