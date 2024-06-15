import { ButtonHTMLAttributes, PropsWithChildren, useState } from "react";
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
  const [selectedCombatantId, setSelectedCombatantId] = useState<string | null>(
    null
  );

  const activeCombatantId = state.activeCombatantId;
  const activeCombatant = activeCombatantId
    ? state.combatantsById[activeCombatantId]
    : null;

  return (
    <div>
      <Button onClick={() => nextTurn()}>Next Turn</Button>
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
              onClick={() => setSelectedCombatantId(combatantId)}
              className={`transition-colors ease-linear duration-300 border-2 ${
                activeCombatantId === combatantId
                  ? "bg-primary-200 font-bold"
                  : "bg-transparent"
              } ${
                selectedCombatantId === combatantId
                  ? "border-primary-600"
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
      className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </button>
  );
};
