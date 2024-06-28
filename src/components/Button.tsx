import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
};

export const Button = ({ children, href, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      {...props}
      {...(href && { onClick: () => (window.location.href = href) })}
    >
      {children}
    </button>
  );
};
