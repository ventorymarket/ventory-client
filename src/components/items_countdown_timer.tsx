import React from "react";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // return <Completionist />;
  } else {
    return (
      <div
        className="js-countdown-single-timer flex w-full justify-evenly"
        data-countdown="2022-09-07T19:40:30"
        data-expired="This auction has ended"
      >
        <span className="countdown-days flex items-end">
          <div className="">{days}</div>
          <div className="block tracking-tight">d</div>
        </span>
        <span className="countdown-hours flex items-end">
          <span className="js-countdown-hours-number">{hours}</span>
          <span className="block tracking-tight">h</span>
        </span>
        <span className="countdown-minutes flex items-end">
          <span className="js-countdown-minutes-number">{minutes}</span>
          <span className="block tracking-tight">m</span>
        </span>
        <span className="countdown-seconds flex items-end">
          <span className="js-countdown-seconds-number">{seconds}</span>
          <span className="block tracking-tight">s</span>
        </span>
      </div>
    );
  }
};

const Items_Countdown_timer = ({
  time = 500000,
  onCountDownComplete,
  className,
}: any) => {
  
  return (
    <Countdown
      className={className}
      date={Date.now() + time}
      renderer={renderer}
      onComplete={onCountDownComplete}
   />
  );
};

export default Items_Countdown_timer;
