import { useState } from "react";
import { Combatant, RulesPlugin } from "../RegisterPlugin";
import { useCombatStore } from "../state/useCombatStore";
import { useTranslation } from "next-i18next";
import { Button } from "./Button";
import { generateId } from "../state/generateId";
import _ from "lodash";
import { useArray } from "../hooks/useArray";
import { Heading } from "./Heading";

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
  const { undo } = useCombatStore.temporal.getState();
  const [selectedCombatantId, setSelectedCombatantId] = useState<string | null>(
    null
  );

  const activeCombatantId = state.activeCombatantId;

  return (
    <div className="m-8 gap-2 flex flex-col">
      <Button onClick={() => nextTurn()}>{t("commands.next-turn")}</Button>
      <Button onClick={() => undo()}>{t("commands.undo")}</Button>
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

const CombatantDisplay = (props: {
  activeCombatantId: string | null;
  selectedCombatantId: string | null;
  rulesPlugin: RulesPlugin<any, any>;
}) => {
  const combatantsById = useCombatStore(
    (state) => state.combatState.combatantsById
  );
  const { t } = useTranslation("common");

  const [prompts, addPrompt, removePrompt] = useArray<React.ReactElement>();

  const activeCombatant = props.activeCombatantId
    ? combatantsById[props.activeCombatantId]
    : null;

  const selectedCombatant = props.selectedCombatantId
    ? combatantsById[props.selectedCombatantId]
    : null;

  if (selectedCombatant) {
    return (
      <div className="flex flex-col gap-2">
        <Heading>{t("tracker.selected-combatant")}</Heading>
        <CombatantCommands
          combatant={selectedCombatant}
          rulesPlugin={props.rulesPlugin}
          addPrompt={addPrompt}
          removePrompt={removePrompt}
        />
        {prompts}
        <div>{props.rulesPlugin.renderFullView(selectedCombatant)}</div>
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

const CombatantCommands = (props: {
  rulesPlugin: RulesPlugin<any, any>;
  combatant: Combatant | null | undefined;
  addPrompt: (prompt: React.ReactElement) => void;
  removePrompt: (prompt: React.ReactElement) => void;
}) => {
  const { combatant, rulesPlugin, addPrompt, removePrompt } = props;
  const updateCombatant = useCombatStore((state) => state.updateCombatant);

  if (!combatant) {
    return null;
  }

  return rulesPlugin.getCombatantCommands().map((c, i) => {
    return (
      <Button
        key={i}
        onClick={() => {
          const clonedCombatant = _.cloneDeep(combatant);
          if (c.callback) {
            c.callback(clonedCombatant, updateCombatant);
          }
          if (c.prompt) {
            const Prompt = c.prompt;
            const promptId = generateId();
            const component = (
              <Prompt
                key={promptId}
                combatant={clonedCombatant}
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
  });
};
