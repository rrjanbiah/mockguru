import { useEffect, useState } from "react";

export default function Timer({
  duration,
  onTimerEnd,
}: {
  duration: number;
  onTimerEnd: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-4 bg-gray-100 text-center font-bold">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
}
