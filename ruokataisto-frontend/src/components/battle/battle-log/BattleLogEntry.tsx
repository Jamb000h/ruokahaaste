import {
  BattleLogEntryType,
  IBattleLogEntry,
} from "../../../interfaces/IBattleLogEntry";
import { AttackEntry } from "./AttackEntry";
import { FinishEntry } from "./FinishEntry";
import { StartEntry } from "./StartEntry";

interface IProps {
  logEntry: IBattleLogEntry;
}

export const BattleLogEntry = (props: IProps) => {
  const entryComponent = (logEntry: IBattleLogEntry) => {
    switch (logEntry.type) {
      case BattleLogEntryType.ATTACK:
        return <AttackEntry logEntry={logEntry} />;
      case BattleLogEntryType.START:
        return <StartEntry logEntry={logEntry} />;
      case BattleLogEntryType.FINISH:
        return <FinishEntry logEntry={logEntry} />;
      default:
        return <></>;
    }
  };

  return entryComponent(props.logEntry);
};
