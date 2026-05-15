import { useEffect } from "react";

const usePageTop = ({ respectHash = false } = {}) => {
  useEffect(() => {
    if (respectHash && window.location.hash) return;
    window.scrollTo(0, 0);
  }, [respectHash]);
};

export default usePageTop;
