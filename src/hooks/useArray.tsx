import { useCallback, useState } from "react";

export function useArray<T>(initialArray?: T[]) {
  const [state, setState] = useState<T[]>(initialArray || []);
  const add = useCallback((addItem: T) => setState([...state, addItem]), []);
  const remove = useCallback(
    (removeItem: T) => setState(state.filter((item) => item === removeItem)),
    []
  );

  return [state, add, remove] as const;
}
