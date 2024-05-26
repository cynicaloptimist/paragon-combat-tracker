import { RulesPlugin } from "../../RegisterPlugin";

export type DnD5eCharacter = {
  statBlock: DnD5eStatBlock;
  currentHP: number;
};

export type DnD5eStatBlock = {
  initiativeModifier: number;
  name: string;
  maxHP: number;
};

function DefaultStatBlock(): DnD5eStatBlock {
  return {
    initiativeModifier: 0,
    name: "Default StatBlock",
    maxHP: 1,
  };
}

export const dnd5e: RulesPlugin<DnD5eCharacter, DnD5eStatBlock> = {
  loadStatBlock(inputString) {
    return DefaultStatBlock();
  },
  loadCharacter(inputString) {
    return {
      statBlock: DefaultStatBlock(),
      currentHP: DefaultStatBlock().maxHP,
    };
  },
  getInitiativeResult(combatant) {
    return combatant.character.statBlock.initiativeModifier.toString();
  },
  initializeCharacter(statBlock) {
    return {
      statBlock,
      currentHP: statBlock.maxHP,
    };
  },
  renderFullView(combatant) {
    return <div>{JSON.stringify(combatant)}</div>;
  },
  renderSmallView(combatant) {
    return <div>{JSON.stringify(combatant)}</div>;
  },
  renderInitiativeRow(combatant) {
    const { character } = combatant;
    const { statBlock } = character;
    return (
      <div>
        {statBlock.name} {character.currentHP}/{statBlock.maxHP}
      </div>
    );
  },
};
