import { RulesPlugin } from "../RegisterPlugin";

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
    const { character, initiativeResult } = combatant;
    const { statBlock, currentHP } = character;
    const { name, maxHP } = statBlock;
    return (
      <div className="flex flex-row gap-2">
        <div className="font-bold text-right w-6">{initiativeResult}</div>
        <div>{name}</div>
        <div>
          {currentHP}/{maxHP}
        </div>
      </div>
    );
  },
};
