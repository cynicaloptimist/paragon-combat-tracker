import _ from "lodash";
import { Combatant, RulesPlugin } from "./RegisterPlugin";

function generateId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const length = 10;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export type CombatState<TCharacter> = {
  activeCombatantIds: string[];
  combatantsById: Record<string, Combatant<TCharacter>>;
};

const makeDefaultCombatant = (rulesPlugin: RulesPlugin<any, any>) => {
  const statblock = rulesPlugin.loadStatBlock("");
  const character = rulesPlugin.initializeCharacter(statblock);
  const combatant: Combatant<any> = {
    id: generateId(),
    character,
    initiativeResult: "0",
  };
  return combatant;
};

export const getDefaultCombatState: (
  rulesPlugin: RulesPlugin<any, any>
) => CombatState<any> = (rulesPlugin) => {
  const combatant = makeDefaultCombatant(rulesPlugin);
  const combatant2 = makeDefaultCombatant(rulesPlugin);
  const combatant3 = makeDefaultCombatant(rulesPlugin);
  combatant.initiativeResult = "10";
  combatant2.initiativeResult = "4a";
  combatant3.initiativeResult = "5a";
  const combatantsById = _.keyBy(
    [combatant, combatant2, combatant3],
    (c) => c.id
  );
  
  return {
    activeCombatantIds: ["1"],
    combatantsById: { "1": combatant, "2": combatant2, "3": combatant3 },
  };
};

export const sortCombatantsDefault = (
  c1: Combatant<any>,
  c2: Combatant<any>
) => {
  const i1 = _.parseInt(c1.initiativeResult);
  const i2 = _.parseInt(c2.initiativeResult);
  return i2 - i1;
};
