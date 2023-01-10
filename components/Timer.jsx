import Countdown from "react-countdown";
import CountDownRenderer from "./CountdownRenderer";

const Completionist = () => <span>You are good to go!</span>;

const Timer = () => {
  const countDown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <CountDownRenderer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <span className="text-base font-normal">Voting sedang berlangsung :</span>
      <Countdown date={Date.now() + 100000000} renderer={countDown} />
    </div>
  );
};

export default Timer;
