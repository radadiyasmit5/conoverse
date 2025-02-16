import { useEffect } from "react";
import { useAnimate, AnimationScope } from "framer-motion";

interface AnimationOptions {
  initial?: object;
  animate?: object;
  duration?: number;
  delay?: number;
}

export const useAnimation = (options: AnimationOptions = {}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async () => {
      await animate(
        scope.current,
        options.animate || { opacity: [0, 1], y: [20, 0] },
        {
          duration: options.duration || 0.3,
          delay: options.delay || 0
        }
      );
    };

    enterAnimation();
  }, [scope, animate, options]);

  return scope as AnimationScope;
};

export const pageTransitionVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const listItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleInVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};