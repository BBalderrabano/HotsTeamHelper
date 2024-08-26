import React, { useContext, useState, useEffect, useRef } from "react";
import { ReactReduxContext, connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./styles.css";
import { saveAllPlayers } from "../../services/players";

const MainInput = ({ selected, players, players_db }) => {
  const { store } = useContext(ReactReduxContext);

  const [playerName, setPlayerName] = useState("");

  const [playerGuess, setPlayerGuess] = useState("");

  const inputRef = useRef();

  const changePlayerName = (event) => {
    setPlayerName(event.target.value);
  };

  const addPlayer = (playerName) => {
    if (players.find((player) => player.name === playerName)) {
      return;
    }

    let existing_player = players_db.find(
      (player) => player.name === playerName
    );

    store.dispatch({
      type: "players/playerAdded",
      payload: {
        name: existing_player?.name || playerName,
        character: "",
        comment: existing_player?.comment || "",
        charactersPlayed: existing_player?.charactersPlayed || [],
      },
    });
  };

  const keyDownHandler = (event) => {
    if (
      event.key === " " &&
      playerName !== "" &&
      selected === "main" &&
      playerGuess !== ""
    ) {
      event.preventDefault();
      setPlayerName(playerGuess);
      setPlayerGuess("");
    } else if (
      event.key === "Enter" &&
      playerName !== "" &&
      selected === "main"
    ) {
      event.preventDefault();
      addPlayer(playerName);
      setPlayerName("");
    }
    if (event.key == "F12" && players.length > 0) {
      event.preventDefault();

      let noCharacterPlayers = players.filter(
        (player) => player.character === ""
      );

      if (noCharacterPlayers.length > 0) {
        confirmAlert({
          title: "Error",
          message:
            "All players must have a character assigned before submitting",
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      } else {
        confirmAlert({
          title: "Confirm to submit",
          message: "Are you sure you want to submit?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                saveAllPlayers(players).then((res) => {
                  if (res.status === "success") {
                    store.dispatch({
                      type: "application/clearApplication",
                      payload: res.data.players,
                    });
                  }
                });
              },
            },
            {
              label: "No",
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  useEffect(() => {
    if (playerName) {
      let guess = players_db.find(
        (player) =>
          player.name.toLowerCase().startsWith(playerName.toLowerCase()) &&
          players.find((p) => p.name === player.name) === undefined
      );
      if (guess) {
        setPlayerGuess(guess.name);
      } else {
        setPlayerGuess("");
      }
    } else {
      setPlayerGuess("");
    }
  }, [playerName]);

  useEffect(() => {
    if (selected === "main") {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
      setPlayerName("");
    }
  }, [selected]);

  return (
    <div
      className={
        "main-input-container " + (selected === "main" ? "focused" : "")
      }
    >
      <input
        type="text"
        ref={inputRef}
        value={playerName}
        onChange={changePlayerName}
        onClick={() => store.dispatch({ type: "application/mainSelected" })}
        className="main-input"
        autoFocus={selected === "main"}
        placeholder="Enter the player name"
      />
      <input
        value={playerGuess}
        readOnly={true}
        className="main-autocomplete"
      />
      {playerName && <button className="button-88">Add player</button>}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    selected: state.selected,
    players: state.players,
    players_db: state.players_db,
  };
};

export default connect(mapStatetoProps)(MainInput);
