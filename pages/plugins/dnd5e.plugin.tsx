import { RulesPlugin } from "../../RegisterPlugin";

export type DnD5eCharacter = {
  statBlock: DnD5eStatBlock;
};

export type DnD5eStatBlock = {
  InitiativeModifier: number;
  Name: string;
};

function DefaultStatBlock(): DnD5eStatBlock {
  return {
    InitiativeModifier: 0,
    Name: "Default StatBlock",
  };
}

export const dnd5e: RulesPlugin<DnD5eCharacter, DnD5eStatBlock> = {
  loadStatBlock(inputString) {
    return DefaultStatBlock();
  },
  loadCharacter(inputString) {
    return {
      statBlock: DefaultStatBlock(),
    };
  },
  getInitiativeResult(combatant) {
    return combatant.character.statBlock.InitiativeModifier.toString();
  },
  initializeCharacter(statBlock) {
    return {
      statBlock,
    };
  },
  renderFullView(combatant) {
    return <div>{JSON.stringify(combatant)}</div>;
  },
  renderSmallView(combatant) {
    return <div>{JSON.stringify(combatant)}</div>;
  },
  renderInitiativeRow(combatant) {
    return <div>{JSON.stringify(combatant)}</div>;
  },
};
