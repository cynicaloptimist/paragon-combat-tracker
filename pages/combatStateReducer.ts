import { Reducer } from "react";
import { CombatState } from "./CombatState";

type Action = {
  type: string;
  payload: any;
};

export const combatStateReducer: Reducer<CombatState<any>, any> = (
  previousState: CombatState<any>,
  action: Action
) => {
  
  return previousState;
};
