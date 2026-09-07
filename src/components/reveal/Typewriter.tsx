import { useEffect, useState } from "react";

export function Typewriter({
  text,
  delay = 0,
  speed = 70,
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        className="ml-0.5 inline-block w-[0.5ch] text-primary"
        style={{ animation: "caret-blink 1s steps(1) infinite" }}
      >
        _
      </span>
    </span>
  );
}
