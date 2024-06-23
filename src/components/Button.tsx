import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children, ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </button>
  );
};
