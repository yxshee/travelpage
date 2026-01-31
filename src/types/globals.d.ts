/* eslint-disable @typescript-eslint/no-explicit-any */

// GSAP types (loaded from CDN)
interface GSAPTimeline {
  to(
    targets: gsap.TweenTarget,
    vars: gsap.TweenVars,
    position?: gsap.Position
  ): GSAPTimeline;
  add(callback: () => void, position?: gsap.Position): GSAPTimeline;
}

declare namespace gsap {
  type TweenTarget = string | Element | Element[] | NodeListOf<Element> | null;
  type Position = number | string;

  interface TweenVars {
    [key: string]: any;
    duration?: number;
    ease?: string;
    stagger?: number | { each?: number; from?: string };
    delay?: number;
    scrollTrigger?: ScrollTriggerVars;
    overwrite?: string | boolean;
  }

  interface ScrollTriggerVars {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    toggleActions?: string;
  }

  function to(targets: TweenTarget, vars: TweenVars): any;
  function fromTo(targets: TweenTarget, fromVars: TweenVars, toVars: TweenVars): any;
  function set(targets: TweenTarget, vars: TweenVars): void;
  function timeline(vars?: TweenVars): GSAPTimeline;
  function registerPlugin(...plugins: any[]): void;
}

export declare const ScrollTrigger: {
  refresh(): void;
  getAll(): Array<{
    vars: { trigger?: string | Element };
    kill(): void;
  }>;
  create(vars: gsap.ScrollTriggerVars): void;
};

// Lenis types (loaded from CDN)
export declare class Lenis {
  constructor(options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
  });
  raf(time: number): void;
  destroy(): void;
}

// Extend Window interface
declare global {
  interface Window {
    gsap: typeof gsap;
    Lenis: typeof Lenis;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

export {};
