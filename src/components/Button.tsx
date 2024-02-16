import React from "react";

type ButtonProps = {
  variant?: string;
  size?: string;
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ variant = "primary", size, children, onClick }) => {
  let buttonClasses = "rounded p-2 px-5 shadow-md";

  switch (size) {
    case "large":
      buttonClasses += " text-xl";
      break;
    case "small":
      buttonClasses += " text-xs";
      break;
    default:
      buttonClasses += " text-base";
  }

  switch (variant) {
    case "primary":
      buttonClasses += " bg-blue-500 text-white";
      break;
    case "danger":
      buttonClasses += " bg-red-500 text-white";
      break;
    case "success":
      buttonClasses += " bg-green-500 text-white";
      break;
    case "secondary":
      buttonClasses += " bg-gray-300 text-gray-900";
      break;
    default:
      buttonClasses += " bg-blue-500 text-white";
  }

  return (
    <button onClick={onClick} className={buttonClasses} type="button">
      {children}
    </button>
  );
};

export default Button;
