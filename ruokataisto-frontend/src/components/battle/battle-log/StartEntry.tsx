import { IStartEntry } from "../../../interfaces/IBattleLogEntry";

interface IProps {
  logEntry: IStartEntry;
}

export const StartEntry = (props: IProps) => {
  const { characters } = props.logEntry;
  return (
    <p className="log-entry log-entry--start">
      Taistelu alkaa! Taistelussa ovat vastakkain{" "}
      <span className="character">{characters[0]}</span> ja{" "}
      <span className="character">{characters[1]}</span>
    </p>
  );
};
