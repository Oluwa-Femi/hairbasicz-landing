import React, { useState } from "react";

const CountDown = ({ over, setOver }) => {
  const [time, setTime] = useState({
    minutes: parseInt("5"),
    seconds: parseInt("0"),
  });

  const tick = () => {
    if (over) return;
    if (time.minutes == 0 && time.seconds == 0) setOver(true);
    else if (time.seconds == 0)
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };
  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      {over ? (
        <div className="text-red-500">Code expired</div>
      ) : (
        <div className="font-normal text-base text-black">
          {time.minutes.toString().padStart(2, "0")}:
          {time.seconds.toString().padStart(2, "0")}
        </div>
      )}
    </div>
  );
};

export default CountDown;
