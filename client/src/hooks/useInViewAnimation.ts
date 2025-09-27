import { useEffect, useRef, useState } from 'react';

export interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useInViewAnimation<T extends HTMLElement = HTMLElement>(options: UseInViewAnimationOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

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

// Utility function to get animation classes based on view state
export function getAnimationClasses(
  isInView: boolean, 
  animationType: 'fade-in' | 'fade-in-up' | 'scale-in' = 'fade-in-up',
  baseClasses = ''
) {
  const animationClass = `animate-${animationType}`;
  const visibilityClass = isInView ? 'animate-in' : 'animate-out';
  
  return `${baseClasses} ${animationClass} ${visibilityClass}`.trim();
}