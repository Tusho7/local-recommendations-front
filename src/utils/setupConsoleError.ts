type ConsoleErrorArguments = Parameters<typeof console.error>;

const error = console.error;
console.error = (...args: ConsoleErrorArguments) => {
  if (
    args.length > 0 &&
    typeof args[0] === "string" &&
    /defaultProps/.test(args[0])
  )
    return;
  error(...args);
};

export default error;
