import { useEffect, useRef, useState } from 'react';

export interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useInViewAnimation<T extends HTMLElement = HTMLElement>(options: UseInViewAnimationOptions = {}) {
  const elementRef = useRef<T>(null);

  // Simplified: always return true to disable all scroll animations
  return {
    elementRef,
    isInView: true,
    skipAnimation: true,
  };
}

// Utility function to get animation classes based on view state
export function getAnimationClasses(
  isInView: boolean, 
  animationType: 'fade-in' | 'fade-in-up' | 'scale-in' = 'fade-in-up',
  baseClasses = '',
  skipAnimation = false
) {
  // Always skip animations to prevent flashing
  return baseClasses.trim();
}