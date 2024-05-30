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
  combatantsById: Record<string, Combatant<TCharacter> | undefined>;
  activeCombatantIds: string[];
  initiativeOrderCombatantIds: string[];
};

const makeDefaultCombatant = (
  rulesPlugin: RulesPlugin<any, any>,
  combatantId: string
) => {
  const statblock = rulesPlugin.loadStatBlock("");
  const character = rulesPlugin.initializeCharacter(statblock);
  const combatant: Combatant<any> = {
    id: combatantId,
    character,
    initiativeResult: "0",
  };
  return combatant;
};

export const getDefaultCombatState: (
  rulesPlugin: RulesPlugin<any, any>
) => CombatState<any> = (rulesPlugin) => {
  const combatant = makeDefaultCombatant(rulesPlugin, "1");
  const combatant2 = makeDefaultCombatant(rulesPlugin, "2");
  const combatant3 = makeDefaultCombatant(rulesPlugin, "3");
  combatant.initiativeResult = "10";
  combatant2.initiativeResult = "4a";
  combatant3.initiativeResult = "5a";
  const combatantsById = _.keyBy(
    [combatant, combatant2, combatant3],
    (c) => c.id
  );

  return {
    activeCombatantIds: [combatant.id],
    combatantsById,
    initiativeOrderCombatantIds: getSortedIdsCombatants(combatantsById).map(
      ([combatantId]) => combatantId
    ),
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

export function getSortedIdsCombatants(
  combatantsById: Record<string, Combatant<any>>
) {
  return Object.entries(combatantsById).sort(
    ([_k1, combatant1], [_k2, combatant2]) =>
      sortCombatantsDefault(combatant1, combatant2)
  );
}
