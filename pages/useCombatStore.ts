import { create } from "zustand";
import { CombatState, getDefaultCombatState } from "./CombatState";
import { dnd5e } from "./plugins/dnd5e.plugin";

export const useCombatStore = create<{
  combatState: CombatState<any>;
}>((set) => ({
  combatState: getDefaultCombatState(dnd5e),
}));
