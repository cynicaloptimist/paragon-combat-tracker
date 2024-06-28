import { create } from "zustand";
import { produce } from "immer";

import { CombatState, getDefaultCombatState } from "./CombatState";
import { dnd5e } from "../plugins/dnd5e.plugin";
import { Combatant } from "~RegisterPlugin";

type CombatStore = {
  combatState: CombatState<any>;
  nextTurn: () => void;
  updateCombatant: (updatedCombatant: Combatant<any>) => void;
};

export const useCombatStore = create<CombatStore>((set, get) => ({
  combatState: getDefaultCombatState(dnd5e),
  nextTurn: () => {
    const combatState = get().combatState;
    const firstCombatantId = combatState.initiativeOrderCombatantIds[0];
    if (!firstCombatantId) {
      return;
    }
    const activeCombatantId = combatState.activeCombatantId;
    if (!activeCombatantId) {
      set(
        produce<CombatStore>((state) => {
          state.combatState.activeCombatantId = firstCombatantId;
        })
      );
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

    set(
      produce<CombatStore>((state) => {
        state.combatState.activeCombatantId = nextCombatantId;
      })
    );
    return;
  },
  updateCombatant: (updatedCombatant: Combatant<any>) => {
    set(
      produce<CombatStore>((state) => {
        state.combatState.combatantsById[updatedCombatant.id] =
          updatedCombatant;
      })
    );
  },
}));
