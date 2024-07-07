import _ from "lodash";
import { Combatant } from "~/plugin-utils/RulesPlugin";
import { RulesPlugin } from "~/plugin-utils/RulesPlugin";

export type CombatState<TCharacter> = {
  combatantsById: Record<string, Combatant<TCharacter>>;
  activeCombatantId: string | null;
  initiativeOrderCombatantIds: string[];
};

const makeDefaultCombatant = (
  rulesPlugin: RulesPlugin<any, any>,
  combatantId: string
) => {
  const statblock = rulesPlugin.loadStatBlock("");
  const character = rulesPlugin.initializeCharacter(statblock);
  const combatant: Combatant = {
    id: combatantId,
    character,
    initiativeResult: "0",
  };
  return combatant;
};

export const getDefaultCombatState: (
  rulesPlugin: RulesPlugin<any, any>
) => CombatState<any> = (rulesPlugin: RulesPlugin<any, any>) => {
  const combatant = makeDefaultCombatant(rulesPlugin, "1");
  const combatant2 = makeDefaultCombatant(rulesPlugin, "2");
  const combatant3 = makeDefaultCombatant(rulesPlugin, "3");
  const additionalCombatants = _.times(8, (i) =>
    makeDefaultCombatant(rulesPlugin, (i + 5).toString())
  );

  combatant.initiativeResult = "10";
  combatant2.initiativeResult = "4a";
  combatant3.initiativeResult = "5a";
  const combatantsById = _.keyBy(
    [combatant, combatant2, combatant3, ...additionalCombatants],
    (c) => c.id
  );

  return {
    activeCombatantId: null,
    combatantsById,
    initiativeOrderCombatantIds: getInitiativeSortedIdsCombatants(
      combatantsById
    ).map(([combatantId]) => combatantId),
  };
};

export const sortCombatantsDefault = (c1: Combatant, c2: Combatant) => {
  const i1 = _.parseInt(c1.initiativeResult);
  const i2 = _.parseInt(c2.initiativeResult);
  return i2 - i1;
};

export function getInitiativeSortedIdsCombatants(
  combatantsById: Record<string, Combatant>
) {
  return Object.entries(combatantsById).sort(
    ([_k1, combatant1], [_k2, combatant2]) =>
      sortCombatantsDefault(combatant1, combatant2)
  );
}
