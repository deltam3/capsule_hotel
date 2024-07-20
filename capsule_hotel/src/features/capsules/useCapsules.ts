import { useQuery } from "@tanstack/react-query";
import { getCapsules } from "../../services/apiCapsules";

export function useCapsules() {
  const {
    isPending,
    data: capsules,
    error,
  } = useQuery({
    queryKey: ["capsules"],
    queryFn: getCapsules,
  });

  return { isPending, error, capsules };
}
