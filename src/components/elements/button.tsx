import React from "react";
import "../../styles/button.scss";

interface IProps {
  children: React.ReactNode;
  handleClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "black" | "green";
  isActive?: boolean;
}
const Button = ({ children, handleClick, variant, isActive }: IProps) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`button ${variant === "green" && "button--green"} ${
          variant === "black" && "button--black"
        } ${isActive && "button--active"}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
