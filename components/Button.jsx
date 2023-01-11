const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="max-w-full"
      disabled={props.isLoading}
    >
      <span
        className={`block box-border border-solid border-2 border-[#000000] rounded-[0.75em] bg-[#e8e8e8] px-6 py-2 text-black -translate-y-1 -translate-x-1 hover:-translate-y-[0.35rem] hover:-translate-x-[0.35rem] active:translate-y-0 active:translate-x-0 transition-transform ease-in duration-[0.1s] max-w-full ${props.className}`}
      >
        {props.isLoading ? "Loading...." : props.text}
      </span>
    </button>
  );
};

export default Button;
