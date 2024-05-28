import { PropsWithChildren, useReducer } from "react";
import { Combatant, RulesPlugin } from "../RegisterPlugin";
import { getDefaultCombatState } from "../CombatState";
import { combatStateReducer } from "../combatStateReducer";

type TrackerProps<TCharacter, TStatBlock> = {
  rulesPlugin: RulesPlugin<TCharacter, TStatBlock>;
};

export function Tracker<TCharacter, TStatBlock>(
  props: TrackerProps<TCharacter, TStatBlock>
) {
  const { rulesPlugin } = props;
  const [state, dispatch] = useReducer(
    combatStateReducer,
    getDefaultCombatState(rulesPlugin)
  );

  const activeCombatantId = state.activeCombatantIds[0];
  const activeCombatant = activeCombatantId
    ? state.combatantsById[activeCombatantId]
    : null;

  return (
    <div>
      <Heading>Initiative Order</Heading>
      <div>
        {Object.entries(state.combatantsById).map(([key, combatant]) => {
          return (
            <div key={key}>{rulesPlugin.renderInitiativeRow(combatant)}</div>
          );
        })}
      </div>
      <Heading>Full View</Heading>
      <div>
        {activeCombatant && rulesPlugin.renderFullView(activeCombatant)}
      </div>
      <Heading>Small View</Heading>
      <div>
        {activeCombatant && rulesPlugin.renderSmallView(activeCombatant)}
      </div>
    </div>
  );
}

const Heading = ({ children }: PropsWithChildren) => (
  <h2 className="font-bold text-lg">{children}</h2>
);
