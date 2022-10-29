import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import { Battleground } from "./components/battle/battleground/BattleGround";
import { BattleLog } from "./components/battle/battle-log/BattleLog";
import { CharacterSelect } from "./components/character-select/CharacterSelect";
import { IAttack } from "./interfaces/IAttack";
import {
  BattleLogEntryType,
  IBattleLogEntry,
} from "./interfaces/IBattleLogEntry";
import { ICharacter } from "./interfaces/ICharacter";
import { useParallax } from "./utils/parallax";
import { Player } from "./domain/Player";
import { GameState } from "./enums/GameState";
import { Background } from "./components/layers/Background";
import { Foreground } from "./components/layers/Foreground";
import { UILayer } from "./components/layers/UILayer";
import { BattleLogButton } from "./components/battle/battle-log/BattleLogButton";

function App() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<ICharacter[]>(
    []
  );
  const [gameState, setGameState] = useState<GameState>(
    GameState.CHARACTER_SELECT
  );
  const [battleLog, setBattleLog] = useState<IBattleLogEntry[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [attacks, setAttacks] = useState<IAttack[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [isOpenBattleLog, setIsOpenBattleLog] = useState<boolean>(false);

  useParallax();

  useEffect(() => {
    const battleLogListener = (logEntry: string) => {
      const battleLogEntry = JSON.parse(logEntry) as IBattleLogEntry;
      if (battleLogEntry.type === BattleLogEntryType.START) {
        const players = selectedCharacters.map((character) =>
          Player.fromCharacter(character)
        );
        setPlayers(players);
        setGameState(GameState.BATTLING);
        setSelectedCharacters([]);
        setBattleLog([]);
        setIsOpenBattleLog(false);
      }

      if (battleLogEntry.type === BattleLogEntryType.FINISH) {
        socket?.disconnect();
        window.setTimeout(() => {
          setGameState(GameState.FINISHED);
          setWinner(battleLogEntry.winner);
          setPlayers([]);
          setSocket(null);
          setAttacks([]);
        }, 1000);
      }

      if (battleLogEntry.type === BattleLogEntryType.ATTACK) {
        const { attacker, target, remainingHp, damage, isCritical } =
          battleLogEntry;
        const attackingPlayer = players.find((player) => {
          return player.name === attacker;
        });
        const targetPlayer = players.find((player) => {
          return player.name === target;
        });
        if (targetPlayer) {
          targetPlayer.remainingHp = remainingHp;
          if (remainingHp <= 0) {
            targetPlayer.isAlive = false;
          }
        }
        if (attackingPlayer && targetPlayer) {
          setAttacks((prevState) => [
            ...prevState,
            {
              attacker: attackingPlayer,
              target: targetPlayer,
              damage,
              isCritical,
            },
          ]);
        }
      }
      setBattleLog((prevState) => [...prevState, JSON.parse(logEntry)]);
    };

    socket?.on("battleLog", battleLogListener);

    return () => {
      socket?.off("battleLog", battleLogListener);
    };
  }, [socket, players, selectedCharacters]);

  useEffect(() => {
    const abortController = new AbortController();

    const getCharacters = async () => {
      try {
        const data = await fetch("http://localhost:3001/characters", {
          signal: abortController.signal,
        });

        const json = await data.json();
        setCharacters(json);
      } catch (err) {}
    };

    getCharacters();

    return () => {
      abortController.abort();
    };
  }, []);

  const startBattle = () => {
    if (socket === null) {
      const newSocket = io(`http://localhost:3001`);
      setSocket(newSocket);
      newSocket.emit(
        "createGame",
        JSON.stringify({
          characterNames: selectedCharacters.map(
            (selectedCharacter) => selectedCharacter.name
          ),
        })
      );
    }
  };

  const toggleBattleLog = () => {
    setIsOpenBattleLog((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Background />
      {gameState === GameState.BATTLING && (
        <Battleground players={players} attacks={attacks} />
      )}
      <Foreground />
      {gameState === GameState.CHARACTER_SELECT && (
        <CharacterSelect
          characters={characters}
          setSelectedCharacters={setSelectedCharacters}
          selectedCharacters={selectedCharacters}
          startBattle={startBattle}
        />
      )}
      {gameState === GameState.FINISHED && (
        <UILayer>
          <div className="winner">
            <h2>Voittaja on {winner}</h2>
            <button
              className="start-battle"
              onClick={() => setGameState(GameState.CHARACTER_SELECT)}
            >
              Pelaa uudelleen
            </button>
          </div>
        </UILayer>
      )}
      {gameState !== GameState.CHARACTER_SELECT && (
        <UILayer
          isInteractive={isOpenBattleLog}
          background={isOpenBattleLog || undefined}
        >
          <BattleLogButton
            onClick={toggleBattleLog}
            isOpenBattleLog={isOpenBattleLog}
          />
          {isOpenBattleLog && <BattleLog logEntries={battleLog} />}
        </UILayer>
      )}
    </div>
  );
}

export default App;
