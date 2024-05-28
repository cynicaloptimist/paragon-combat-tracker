import { Combatant, RulesPlugin } from "./RegisterPlugin";

export type CombatState<TCharacter> = {
  activeCombatantIds: string[];
  combatantsById: Record<string, Combatant<TCharacter>>;
};

const makeDefaultCombatant = (rulesPlugin: RulesPlugin<any, any>) => {
  const statblock = rulesPlugin.loadStatBlock("");
  const character = rulesPlugin.initializeCharacter(statblock);
  const combatant: Combatant<any> = {
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

  return {
    activeCombatantIds: ["1"],
    combatantsById: { "1": combatant, "2": combatant2 },
  };
};
