import { zeroPad } from "react-countdown";

const CountDownItem = ({ label, value }) => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold">{zeroPad(value, 2)}</h1>
        <p className="text-base font-normal">{label}</p>
      </div>
      {label !== "Detik" && (
        <span className="px-3 text-lg font-semibold text-center pb-6">:</span>
      )}
    </>
  );
};
const CountDownRenderer = (props) => {
  return (
    <div className="flex justify-center items-center">
      <CountDownItem label="Hari" value={props.days} />
      <CountDownItem label="Jam" value={props.hours} />
      <CountDownItem label="Menit" value={props.minutes} />
      <CountDownItem label="Detik" value={props.seconds} />
    </div>
  );
};

export default CountDownRenderer;
