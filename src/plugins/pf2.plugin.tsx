import _ from "lodash";
import { PromptComponentProps } from "~/plugin-utils/RulesPlugin";
import { RulesPlugin } from "~/plugin-utils/RulesPlugin";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import { z } from "zod";
import { obj } from "~/plugin-utils/ZodUtils";

export type Pf2Character = {
  statBlock: Pf2StatBlock;
  currentHP: number;
};

const abilitySchema = obj({
  value: z.number().default(10),
});

const pf2StatBlockSchema = obj({
  _id: z.string().default(""),
  name: z.string().default("Unnamed Statblock"),
  data: obj({
    abilities: obj({
      cha: abilitySchema,
      con: abilitySchema,
      dex: abilitySchema,
      int: abilitySchema,
      str: abilitySchema,
      wis: abilitySchema,
    }),
    attributes: obj({
      ac: obj({
        value: z.string().default("10"),
        details: z.string().default(""),
      }),
      hp: obj({
        max: z.string().default("1"),
        details: z.string().default(""),
      }),
      init: obj({
        bonus: z.number().default(0),
      }),
    }),
  }),
});
export type Pf2StatBlock = z.infer<typeof pf2StatBlockSchema>;

function DefaultStatBlock(): Pf2StatBlock {
  return pf2StatBlockSchema.parse({});
}

export const pf2: RulesPlugin<Pf2Character, Pf2StatBlock> = {
  loadStatBlock(inputString) {
    const statBlock = pf2StatBlockSchema.parse(JSON.parse(inputString));
    return statBlock;
  },
  loadCharacter(inputString) {
    const statBlock = pf2StatBlockSchema.parse(JSON.parse(inputString));

    const currentHP = parseInt(statBlock.data.attributes.hp.max);
    return {
      statBlock: statBlock,
      currentHP: currentHP,
    };
  },
  getInitiativeResult(combatant) {
    return combatant.character.statBlock.data.attributes.init.bonus.toString();
  },
  initializeCharacter(statBlock) {
    const currentHP = parseInt(statBlock.data.attributes.hp.max);
    return {
      statBlock,
      currentHP: currentHP,
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
    const name = statBlock.name;
    const maxHP = parseInt(statBlock.data.attributes.hp.max);

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

const ApplyDamagePrompt = (props: PromptComponentProps<Pf2Character>) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <TextInput itemRef={inputRef} label="Apply Damage" onEnter={onSubmit} autoFocus />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};
