import { useNavigate } from "react-router-dom";

type NavigateFunction = (delta?: number | string) => void;

export default function useMoveBack(): NavigateFunction {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return moveBack;
}
