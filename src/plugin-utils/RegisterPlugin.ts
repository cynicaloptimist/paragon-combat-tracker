import { ReactElement } from "react";

export type Combatant<TCharacter = unknown> = {
  id: string;
  character: TCharacter;
  initiativeResult: string;
};

export type UpdateCombatant<TCharacter> = (
  updatedCombatant: Combatant<TCharacter>
) => void;

export type PromptComponentProps<TCharacter> = {
  combatant: Combatant<TCharacter>;
  updateCombatant: UpdateCombatant<TCharacter>;
  complete: () => void;
};

export type CombatantCommand<TCharacter> = {
  label: string;
  callback?: (
    combatant: Combatant<TCharacter>,
    updateCombatant: UpdateCombatant<TCharacter>
  ) => Promise<void>;
  prompt?: React.ComponentType<PromptComponentProps<TCharacter>>;
};

export type RulesPlugin<TCharacter, TStatBlock> = {
  loadCharacter: (inputString: string) => TCharacter;
  loadStatBlock: (inputString: string) => TStatBlock;
  initializeCharacter: (statBlock: TStatBlock) => TCharacter;
  renderInitiativeRow: (combatant: Combatant<TCharacter>) => ReactElement;
  renderSmallView: (combatant: Combatant<TCharacter>) => ReactElement;
  renderFullView: (combatant: Combatant<TCharacter>) => ReactElement;
  getInitiativeResult: (combatant: Combatant<TCharacter>) => string;
  getCombatantCommands: () => CombatantCommand<TCharacter>[];
};

export function RegisterPlugin<TCharacter, TStatBlock>(
  plugin: RulesPlugin<TCharacter, TStatBlock>
) {}
