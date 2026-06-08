import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const start = 0;
    const end = parseFloat(value);
    const range = end - start;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + range * eased;
      setCount(parseFloat(current.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}{typeof count === 'number' ? (decimals > 0 ? count.toFixed(decimals) : Math.floor(count)) : count}{suffix}
    </span>
  );
}
