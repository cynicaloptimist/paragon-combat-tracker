import { ReactElement } from "react";

export type Combatant<TCharacter> = {
  id: string;
  character: TCharacter;
  initiativeResult: string;
};

export type RulesPlugin<TCharacter, TStatBlock> = {
  loadCharacter: (inputString: string) => TCharacter;
  loadStatBlock: (inputString: string) => TStatBlock;
  initializeCharacter: (statBlock: TStatBlock) => TCharacter;
  renderInitiativeRow: (combatant: Combatant<TCharacter>) => ReactElement;
  renderSmallView: (combatant: Combatant<TCharacter>) => ReactElement;
  renderFullView: (combatant: Combatant<TCharacter>) => ReactElement;
  getInitiativeResult: (combatant: Combatant<TCharacter>) => string;
};

export function RegisterPlugin<TCharacter, TStatBlock>(
  plugin: RulesPlugin<TCharacter, TStatBlock>
) {}
