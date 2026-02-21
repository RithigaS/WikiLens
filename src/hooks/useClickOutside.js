import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      // If the clicked element is NOT part of the ref's element, trigger callback
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add global click event listener
    document.addEventListener("mousedown", handleClick);

    // Cleanup: remove the listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
