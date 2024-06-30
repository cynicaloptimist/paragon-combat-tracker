import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { temporal } from "zundo";

import { CombatState, getDefaultCombatState } from "./CombatState";
import { dnd5e } from "../plugins/dnd5e.plugin";
import { Combatant } from "~/RegisterPlugin";

type CombatStore = {
  combatState: CombatState<any>;
  nextTurn: () => void;
  updateCombatant: (updatedCombatant: Combatant<any>) => void;
};

// CombatStore is a zustand store that manages the state of the combat tracker.
// It uses the immer middleware to allow for mutable updates to the state.
// Zundo is used to provide undo functionality to the store.

export const useCombatStore = create<CombatStore>()(
  temporal(
    immer((set, get) => ({
      combatState: getDefaultCombatState(dnd5e),
      nextTurn: () => {
        const combatState = get().combatState;
        const firstCombatantId = combatState.initiativeOrderCombatantIds[0];
        if (!firstCombatantId) {
          return;
        }
        const activeCombatantId = combatState.activeCombatantId;
        if (!activeCombatantId) {
          set((state) => {
            state.combatState.activeCombatantId = firstCombatantId;
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

        set((state) => {
          state.combatState.activeCombatantId = nextCombatantId;
        });
        return;
      },
      updateCombatant: (updatedCombatant: Combatant<any>) => {
        set((state) => {
          state.combatState.combatantsById[updatedCombatant.id] =
            updatedCombatant;
        });
      },
    }))
  )
);
