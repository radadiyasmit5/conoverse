import { useEffect } from "react";
import { useAnimate } from "framer-motion";

export const useAnimation = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async () => {
      await animate(
        scope.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.3 }
      );
    };

    enterAnimation();
  }, [scope, animate]);

  return scope;
};
