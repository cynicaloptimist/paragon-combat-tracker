import { PropsWithChildren } from "react";
import { Combatant, RulesPlugin } from "../RegisterPlugin";

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
      <Heading>Initiative Order</Heading>
      <div>
        <div>{rulesPlugin.renderInitiativeRow(combatant)}</div>
        <div>{rulesPlugin.renderInitiativeRow(combatant)}</div>
      </div>
      <Heading>Full View</Heading>
      <div>{rulesPlugin.renderFullView(combatant)}</div>
      <Heading>Small View</Heading>
      <div>{rulesPlugin.renderSmallView(combatant)}</div>
    </div>
  );
}

const Heading = ({ children }: PropsWithChildren) => (
  <h2 className="font-bold text-lg">{children}</h2>
);
