import { PropsWithChildren, useCallback, useState } from "react";
import { Combatant, RulesPlugin } from "../RegisterPlugin";
import { useCombatStore } from "../state/useCombatStore";
import { useTranslation } from "next-i18next";
import { Button } from "./Button";
import { generateId } from "../state/generateId";

type TrackerProps<TCharacter, TStatBlock> = {
  rulesPlugin: RulesPlugin<TCharacter, TStatBlock>;
};

export function Tracker<TCharacter, TStatBlock>(
  props: TrackerProps<TCharacter, TStatBlock>
) {
  const { rulesPlugin } = props;

  const { t } = useTranslation("common");

  const state = useCombatStore((state) => state.combatState);
  const nextTurn = useCombatStore((state) => state.nextTurn);
  const [selectedCombatantId, setSelectedCombatantId] = useState<string | null>(
    null
  );

  const activeCombatantId = state.activeCombatantId;

  return (
    <div className="m-8 gap-2 flex flex-col">
      <Button onClick={() => nextTurn()}>{t("commands.next-turn")}</Button>
      <Heading>{t("tracker.initiative-order")}</Heading>
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
      <CombatantDisplay
        activeCombatantId={activeCombatantId}
        selectedCombatantId={selectedCombatantId}
        rulesPlugin={rulesPlugin}
      />
    </div>
  );
}

function useArray<T>(initialArray?: T[]) {
  const [state, setState] = useState<T[]>(initialArray || []);
  const add = useCallback((addItem: T) => setState([...state, addItem]), []);
  const remove = useCallback(
    (removeItem: T) => setState(state.filter((item) => item === removeItem)),
    []
  );

  return [state, add, remove] as const;
}

const CombatantDisplay = (props: {
  activeCombatantId: string | null;
  selectedCombatantId: string | null;
  rulesPlugin: RulesPlugin<any, any>;
}) => {
  const state = useCombatStore((state) => state.combatState);
  const updateCombatant = useCombatStore((state) => state.updateCombatant);
  const { t } = useTranslation("common");

  const [prompts, addPrompt, removePrompt] = useArray<React.ReactElement>();

  const activeCombatant = props.activeCombatantId
    ? state.combatantsById[props.activeCombatantId]
    : null;

  const selectedCombatant = props.selectedCombatantId
    ? state.combatantsById[props.selectedCombatantId]
    : null;

  if (selectedCombatant) {
    return (
      <div>
        <Heading>{t("tracker.selected-combatant")}</Heading>
        {props.rulesPlugin.renderFullView(selectedCombatant)}
        {props.rulesPlugin.getCombatantCommands().map((c, i) => {
          return (
            <Button
              key={i}
              onClick={() => {
                if (c.callback) {
                  c.callback(selectedCombatant, updateCombatant);
                }
                if (c.prompt) {
                  const Prompt = c.prompt;
                  const promptId = generateId();
                  const component = (
                    <Prompt
                      key={promptId}
                      combatant={selectedCombatant}
                      updateCombatant={updateCombatant}
                      complete={() => removePrompt(component)}
                    />
                  );
                  addPrompt(component);
                }
              }}
            >
              {c.label}
            </Button>
          );
        })}
        {prompts}
      </div>
    );
  }

  if (activeCombatant) {
    return (
      <div>
        <Heading>{t("tracker.active-combatant")}</Heading>
        {props.rulesPlugin.renderFullView(activeCombatant)}
      </div>
    );
  }

  return null;
};

const Heading = ({ children }: PropsWithChildren) => (
  <h2 className="font-bold text-lg">{children}</h2>
);
