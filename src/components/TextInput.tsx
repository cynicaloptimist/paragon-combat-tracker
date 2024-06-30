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

  return (
    <div>
      {props.label}
      <input autoFocus ref={props.itemRef} onKeyDown={onKeyDown} />
    </div>
  );
};
