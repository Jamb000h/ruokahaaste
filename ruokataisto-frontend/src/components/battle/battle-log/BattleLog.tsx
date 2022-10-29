import { IBattleLogEntry } from "../../../interfaces/IBattleLogEntry";
import { BattleLogEntry } from "./BattleLogEntry";
import "./BattleLog.css";
import React, { createRef, useEffect, useMemo, useState } from "react";

interface IProps {
  logEntries: IBattleLogEntry[];
}

export const BattleLog = (props: IProps) => {
  const { logEntries } = props;
  const [snapScroll, setSnapScroll] = useState(true);

  const battleLogRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (snapScroll && battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [snapScroll, battleLogRef]);

  const handleOnScroll = (e: React.SyntheticEvent) => {
    if (
      Math.ceil(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      e.currentTarget.clientHeight
    ) {
      setSnapScroll(true);
    } else {
      setSnapScroll(false);
    }
  };

  // Nice to memo this to prevent recalculation as this component
  // rerenders after every scroll but logEntries only update
  // when backend sends a new log entry
  const battleLogEntries = useMemo(() => {
    return logEntries.map((logEntry, i) => (
      <BattleLogEntry key={i} logEntry={logEntry} />
    ));
  }, [logEntries]);

  return (
    <div className="battle-log" ref={battleLogRef} onScroll={handleOnScroll}>
      {battleLogEntries}
    </div>
  );
};
