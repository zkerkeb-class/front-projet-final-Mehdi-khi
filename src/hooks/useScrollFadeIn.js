import { useEffect, useRef, useState } from "react";

const useScrollFadeIn = () => {
  const [visible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return { ref: domRef, className: visible ? "fade-in" : "hidden" };
};

export default useScrollFadeIn;
