import { useEffect } from "react";

function useOutsideClick(ref, cb, exceptionId) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        ref.current &&
        e.target.id !== exceptionId &&
        !ref.current.contains(e.target)
      ) {
        cb();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, cb, exceptionId]);
}

export default useOutsideClick;
