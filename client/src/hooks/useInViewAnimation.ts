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
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsInView(true);
      setSkipAnimation(true);
      return;
    }

    // Check if element is initially in viewport to skip animation
    const rect = element.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInitiallyVisible) {
      setIsInView(true);
      setSkipAnimation(true);
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
    skipAnimation,
  };
}

// Utility function to get animation classes based on view state
export function getAnimationClasses(
  isInView: boolean, 
  animationType: 'fade-in' | 'fade-in-up' | 'scale-in' = 'fade-in-up',
  baseClasses = '',
  skipAnimation = false
) {
  const animationClass = `animate-${animationType}`;
  
  // If skipping animation, just return base classes
  if (skipAnimation) {
    return baseClasses.trim();
  }
  
  const visibilityClass = isInView ? 'animate-in' : 'animate-out';
  
  return `${baseClasses} ${animationClass} ${visibilityClass}`.trim();
}