import { useCallback, useEffect, useState } from "react";

export function useOtpResendTimer(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const isRunning = secondsLeft > 0;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const restart = useCallback(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const canResend = secondsLeft <= 0;

  return { secondsLeft, canResend, restart };
}
