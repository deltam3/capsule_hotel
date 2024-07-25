import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useOutsideClick(
  ref: RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    function handleClick(event: AnyEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, handler]);
}
