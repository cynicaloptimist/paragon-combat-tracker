import { ButtonHTMLAttributes, PropsWithChildren, useReducer } from "react";
import { RulesPlugin } from "../RegisterPlugin";
import { useCombatStore } from "../useCombatStore";

type TrackerProps<TCharacter, TStatBlock> = {
  rulesPlugin: RulesPlugin<TCharacter, TStatBlock>;
};

export function Tracker<TCharacter, TStatBlock>(
  props: TrackerProps<TCharacter, TStatBlock>
) {
  const { rulesPlugin } = props;

  const state = useCombatStore((state) => state.combatState);
  const nextTurn = useCombatStore((state) => state.nextTurn);

  const activeCombatantId = state.activeCombatantId;
  const activeCombatant = activeCombatantId
    ? state.combatantsById[activeCombatantId]
    : null;

  return (
    <div>
      <Heading>Initiative Order</Heading>
      <div>
        {state.initiativeOrderCombatantIds.map((combatantId) => {
          const combatant = state.combatantsById[combatantId];
          if (!combatant) {
            return <div key={combatantId}>Combatant {combatantId} missing</div>;
          }
          return (
            <div
              key={combatantId}
              className={`border-2 ${
                activeCombatantId === combatantId
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              {rulesPlugin.renderInitiativeRow(combatant)}
            </div>
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
      <Button onClick={() => nextTurn()}>Next Turn</Button>
    </div>
  );
}

const Heading = ({ children }: PropsWithChildren) => (
  <h2 className="font-bold text-lg">{children}</h2>
);

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
      {...props}
    >
      {children}
    </button>
  );
};
