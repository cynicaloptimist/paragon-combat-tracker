import _ from "lodash";
import { PromptComponentProps } from "~/plugin-utils/RulesPlugin";
import { RulesPlugin } from "~/plugin-utils/RulesPlugin";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import { z } from "zod";

export type DnD5eCharacter = {
  statBlock: DnD5eStatBlock;
  currentHP: number;
};

const traitSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  usage: z.string().optional(),
});

const dnd5eStatBlockSchema = z.object({
  initiativeModifier: z.number().default(0),
  name: z.string().default("Default StatBlock"),
  size: z.string().default("Medium"),
  type: z.string().default(""),
  alignment: z.string().default(""),
  maxHP: z.number().default(10),
  hitDice: z.string().default(""),
  armorClass: z.number().default(10),
  armorClassNotes: z.string().default(""),
  speeds: z.array(z.string()).default([]),
  abilityScores: z
    .object({
      strength: z.number().default(10),
      dexterity: z.number().default(10),
      constitution: z.number().default(10),
      intelligence: z.number().default(10),
      wisdom: z.number().default(10),
      charisma: z.number().default(10),
    })
    .default({}),
  savingThrows: z
    .object({
      strength: z.number().optional(),
      dexterity: z.number().optional(),
      constitution: z.number().optional(),
      intelligence: z.number().optional(),
      wisdom: z.number().optional(),
      charisma: z.number().optional(),
    })
    .default({}),
  skills: z.record(z.number()).default({}),
  senses: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  challengeRating: z.string().default("0"),
  proficiencyBonus: z.number().default(2),
  traits: z.array(traitSchema).default([]),
  actions: z.array(traitSchema).default([]),
  reactions: z.array(traitSchema).default([]),
  bonusActions: z.array(traitSchema).default([]),
  legendaryActions: z.array(traitSchema).default([]),
});

export type DnD5eStatBlock = z.infer<typeof dnd5eStatBlockSchema>;

function DefaultStatBlock(): DnD5eStatBlock {
  return dnd5eStatBlockSchema.parse({});
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
      <div className="flex flex-row gap-2 py-2">
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
