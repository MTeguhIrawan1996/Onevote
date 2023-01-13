import Countdown from "react-countdown";
import CountDownRenderer from "./CountdownRenderer";
import {
  STATE_END,
  STATE_LOADING,
  STATE_NOT_STARTED,
  STATE_STARTED,
} from "../pages/participant/[code]";
import Spiner from "./Spiner";

const Completionist = () => <span>You are good to go!</span>;

const Timer = (props) => {
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
      {props.currentState === STATE_LOADING && <Spiner />}
      {props.currentState === STATE_NOT_STARTED && (
        <>
          <span className="text-base font-normal">
            Voting akan dimulai pada :
          </span>
          <Countdown date={props.start} renderer={countDown} />
        </>
      )}
      {props.currentState === STATE_STARTED && (
        <>
          <span className="text-base font-normal">
            Voting sedang berlangsung :
          </span>
          <Countdown date={props.end} renderer={countDown} />
        </>
      )}
      {props.currentState === STATE_END && (
        <>
          <span className="text-xl font-semibold max-[450px]:text-base">
            Voting Berkahir ✔
          </span>
        </>
      )}
    </div>
  );
};

export default Timer;
