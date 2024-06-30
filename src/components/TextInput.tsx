import { useRef } from "react";
import { generateId } from "~/state/generateId";

export const TextInput = (props: {
  itemRef: React.RefObject<HTMLInputElement>;
  label: string;
  onEnter?: () => void;
}) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onEnter?.();
    }
  };

  const inputId = useRef(generateId());

  return (
    <div className="flex flex-row gap-2 items-center">
      <label htmlFor={inputId.current}>{props.label}</label>
      <input
        className="border-2 rounded-md p-1 border-primary-300 focus:outline-primary-600 w-16"
        id={inputId.current}
        autoFocus
        ref={props.itemRef}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
