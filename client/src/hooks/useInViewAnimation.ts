import { useEffect, useRef, useState } from 'react';

export interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useInViewAnimation<T extends HTMLElement = HTMLElement>(options: UseInViewAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -5% 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = window.setTimeout(() => {
              setIsInView(true);
            }, delay);
          } else {
            setIsInView(true);
          }

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    elementRef,
    isInView,
  };
}