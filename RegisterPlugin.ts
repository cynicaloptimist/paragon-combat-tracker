export type Combatant<TCharacter> = {
  character: TCharacter;
  initiativeResult: string;
};

export type Plugin<TCharacter, TStatBlock> = {
  loadCharacter: (inputString: string) => TCharacter;
  loadStatBlock: (inputString: string) => TStatBlock;
  initializeCharacter: (statBlock: TStatBlock) => TCharacter;
  renderInitiativeRow: (combatant: Combatant<TCharacter>) => HTMLElement;
  renderSmallView: (combatant: Combatant<TCharacter>) => HTMLElement;
  renderFullView: (combatant: Combatant<TCharacter>) => HTMLElement;
  getInitiativeResult: (combatant: Combatant<TCharacter>) => string;
};

export function RegisterPlugin<TCharacter, TStatBlock>(
  plugin: Plugin<TCharacter, TStatBlock>
) {}
