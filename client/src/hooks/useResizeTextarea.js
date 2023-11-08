import { useEffect, useRef } from "react";

function useResizeTextarea() {
  const ref = useRef(null);

  useEffect(() => {
    const autoResize = (e) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    };
    const element = ref.current;
    autoResize({ target: element });

    element.addEventListener("input", autoResize, false);

    return () => element.removeEventListener("input", autoResize, false);
  }, []);

  return ref;
}

export default useResizeTextarea;
