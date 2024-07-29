// import { useNavigate } from "react-router-dom";

// type NavigateFunction = (delta?: number | string) => void;

// export default function useMoveBack(): NavigateFunction {
//   const navigate = useNavigate();

//   // const moveBack = () => {
//   //   navigate(-1);
//   // };

//   // return moveBack;
//   return () => navigate(-1);
// }

import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
