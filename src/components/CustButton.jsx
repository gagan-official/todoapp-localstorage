import { btnHover, commonRounded } from "../Todo1";

function CustButton(props) {
  const { className, children } = props;
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white ${commonRounded} px-3 py-1 ${btnHover} ${className}`}
    >
      {children}
    </button>
  );
}

export default CustButton;
