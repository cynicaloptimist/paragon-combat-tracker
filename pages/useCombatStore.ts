import { create } from "zustand";
import { CombatState, getDefaultCombatState } from "./CombatState";
import { dnd5e } from "./plugins/dnd5e.plugin";

export const useCombatStore = create<{
  combatState: CombatState<any>;
  nextTurn: () => void;
}>((set, get) => ({
  combatState: getDefaultCombatState(dnd5e),
  nextTurn: () => {
    const combatState = get().combatState;
    const firstCombatantId = combatState.initiativeOrderCombatantIds[0];
    if (!firstCombatantId) {
      return;
    }
    const activeCombatantId = combatState.activeCombatantIds[0];
    if (!activeCombatantId) {
      set({
        combatState: {
          ...combatState,
          activeCombatantIds: [firstCombatantId],
        },
      });
      return;
    }

    const currentCombatantIndex =
      combatState.initiativeOrderCombatantIds.indexOf(activeCombatantId);

    const nextCombatantIndex =
      (currentCombatantIndex + 1) %
      combatState.initiativeOrderCombatantIds.length;

    const nextCombatantId =
      combatState.initiativeOrderCombatantIds[nextCombatantIndex];

    if (!nextCombatantId) {
      return;
    }

    set({
      combatState: {
        ...combatState,
        activeCombatantIds: [nextCombatantId],
      },
    });
    return;
  },
}));
