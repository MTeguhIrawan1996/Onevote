const Input = (props) => {
  return (
    <>
      <input
        autoComplete="off"
        placeholder={props.placeholder}
        className={`border-solid border-2 border-transparent rounded-lg px-4 transition-border-color duration-300 delay-0 ease-cubic-bezier hover:outline-none hover:border-[#05060f] focus:outline-none focus:border-[#05060f] placeholder:text-sm font-normal bg-zinc-300 h-10 max-w-full ${props.className}`}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </>
  );
};

export default Input;
