import React, { useEffect, useState } from "react";
import GameBoard from "../screens/GameBoard";
import CardContextProvider from "../context/CardContext";
import { useChatContext } from "stream-chat-react";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [firstPlayer, setFirstPlayer] = useState(false);
  const [prevFirstPlayer, setPrevFirstPlayer] = useState(false);
  const [restart, setRestart] = useState(false);
  const [gameStop, setGameStop] = useState(false);
  const { client } = useChatContext();

  const restartGame = async () => {
    if (!gameStop) {
      alert("You can not restart game now");
      return;
    }
    await channel.sendEvent({
      type: "restart",
      data: { prevFirstPlayer },
    });
    setFirstPlayer(!prevFirstPlayer);
    setPrevFirstPlayer(!prevFirstPlayer);
    setRestart(true);
  };

  useEffect(() => {
    if (!playersJoined) {
      setFirstPlayer(true);
      setPrevFirstPlayer(true);
    }
  }, [playersJoined]);

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  channel.on((event) => {
    if (event.type === "restart" && event.user.id !== client.userID) {
      setFirstPlayer(event.data.prevFirstPlayer);
      setPrevFirstPlayer(event.data.prevFirstPlayer);
      setRestart(true);
    }
  });

  return (
    <>
      {playersJoined ? (
        <div className="gameContainer">
          <CardContextProvider
            firstPlayer={firstPlayer}
            setPrevFirstPlayer={setPrevFirstPlayer}
            restart={restart}
            setRestart={setRestart}
            setGameStop={setGameStop}
          >
            <GameBoard restart={restart} setGameStop={setGameStop} />
          </CardContextProvider>
          <button
            onClick={async () => {
              restartGame();
            }}
            style={{
              margin: "5px",
              padding: "5px",
              border: "1px",
              solid: "#ccc",
              borderRadius: "4px",
              width: "405px",
              height: "33px",
              fontSize: "20px",
            }}
          >
            Restart Game
          </button>
        </div>
      ) : (
        <div
          style={{
            fontSize: "45px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Waiting for other player to join...
        </div>
      )}
    </>
  );
}

export default Game;
