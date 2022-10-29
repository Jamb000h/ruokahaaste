import { IFinishEntry } from "../../../interfaces/IBattleLogEntry";

interface IProps {
  logEntry: IFinishEntry;
}

export const FinishEntry = (props: IProps) => {
  const { winner } = props.logEntry;
  return (
    <p className="log-entry log-entry--start">
      Taistelu on päättynyt! Voittajaksi selviytyi{" "}
      <span className="character">{winner}</span>.
    </p>
  );
};
