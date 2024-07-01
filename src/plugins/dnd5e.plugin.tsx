import _ from "lodash";
import { PromptComponentProps } from "~/plugin-utils/RulesPlugin";
import { RulesPlugin } from "~/plugin-utils/RulesPlugin";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "~/components/Button";
import { TextInput } from "~/components/TextInput";

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
    maxHP: 10,
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
    return (
      <pre className="overflow-x-auto">
        {JSON.stringify(combatant, null, 2)}
      </pre>
    );
  },
  renderSmallView(combatant) {
    return (
      <pre className="overflow-x-auto">
        {JSON.stringify(combatant, null, 2)}
      </pre>
    );
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
  getCombatantCommands() {
    return [
      {
        label: "Apply Damage",
        prompt: ApplyDamagePrompt,
      },
    ];
  },
};

const ApplyDamagePrompt = (props: PromptComponentProps<DnD5eCharacter>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  });

  const onSubmit = useCallback(() => {
    const damageAmount = inputRef.current?.value;
    const newHp =
      props.combatant.character.currentHP - _.parseInt(damageAmount || "0");
    props.combatant.character.currentHP = newHp;
    props.updateCombatant(props.combatant);
    props.complete();
  }, [props]);

  return (
    <div className="flex flex-row items-center gap-2">
      <TextInput itemRef={inputRef} label="Apply Damage" onEnter={onSubmit} />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};
