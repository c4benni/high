import { useEffect, useRef, useState } from "react";

export type IntersectionConfig = {
  threshold?: number | number[];
  rootMargin?: string;
  root?: HTMLElement | null;
};

const defaultConfig: IntersectionConfig = {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px",
  root: null,
};

const useIntersection = (options: IntersectionConfig = defaultConfig) => {
  const intersectionRef = useRef(null);

  const [entry, $entry] = useState<IntersectionObserverEntry | null>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    $entry(entry);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    let target: HTMLElement;

    if (intersectionRef.current) {
      target = intersectionRef.current;
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [intersectionRef, options]);

  return [intersectionRef, entry] as const;
};

export default useIntersection;
