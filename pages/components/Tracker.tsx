import { Combatant, RulesPlugin } from "../../RegisterPlugin";

type TrackerProps<TCharacter, TStatBlock> = {
  rulesPlugin: RulesPlugin<TCharacter, TStatBlock>;
};

export function Tracker<TCharacter, TStatBlock>(
  props: TrackerProps<TCharacter, TStatBlock>
) {
  const { rulesPlugin } = props;
  const statblock = rulesPlugin.loadStatBlock("");
  const character = rulesPlugin.initializeCharacter(statblock);
  const combatant: Combatant<TCharacter> = {
    character,
    initiativeResult: "0",
  };
  return (
    <div>
      <div>{rulesPlugin.renderInitiativeRow(combatant)}</div>
      <div>{rulesPlugin.renderInitiativeRow(combatant)}</div>
    </div>
  );
}
