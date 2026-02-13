import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollTarget = string | number | HTMLElement;

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.innerWidth <= 820;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(2, -10 * t),
      smoothWheel: !isTouchDevice,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: { offset?: number; duration?: number }) => {
      if (!lenisRef.current) {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'auto' });
        }
        return;
      }

      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      lenis: lenisInstance,
      scrollTo,
    }),
    [lenisInstance, scrollTo]
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default SmoothScroll;
