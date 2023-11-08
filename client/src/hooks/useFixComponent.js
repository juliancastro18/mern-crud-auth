import { useState, useRef, useEffect } from "react";

function useFixComponent() {
  const [state, setState] = useState(0);
  const [closedProps, setClosedProps] = useState({
    offsetTop: 0,
    height: 0,
  });
  const ref = useRef(null);

  const stateValues = {
    closed: 0,
    editing: 1,
    closing: 2,
  };
  const isState = (stateValue) => state == stateValue;

  useEffect(() => {
    let timeoutId;
    if (isState(stateValues.closing)) {
      timeoutId = setTimeout(() => {
        setState(stateValues.closed);
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [state]);

  const handleClickInside = (e) => {
    e.stopPropagation();
    if (isState(stateValues.closed)) {
      ref.current.style.top = ref.current.offsetTop - window.scrollY + "px";
      const { offsetTop, clientHeight } = ref.current;
      setClosedProps({ offsetTop, clientHeight });
      setState(stateValues.editing);
    }
  };

  const handleClickOutside = () => {
    ref.current.style.top =
      ref.current.offsetTop - ref.current.clientHeight * 0.35 + "px";
    setState(stateValues.closing);
  };

  const style = isState(stateValues.closing)
    ? {
        top: closedProps.offsetTop - window.scrollY + "px",
      }
    : isState(stateValues.editing)
    ? { top: "35%", transform: "translate(0, -35%)" }
    : {};

  return {
    ref,
    isState,
    stateValues,
    style,
    handleClickInside,
    handleClickOutside,
    closedProps,
  };
}

export default useFixComponent;
