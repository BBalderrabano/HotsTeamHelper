import React, { useState, useEffect, useContext } from "react";
import { connect, ReactReduxContext } from "react-redux";
import "./styles.css";
import AutocompleteInput from "./autocompleteInput";

const PlayerBox = ({ selected, player }) => {
  let { store } = useContext(ReactReduxContext);
  let isSelected = selected === player.name;

  let [isCommenting, setIsCommenting] = useState(false);

  let [comment, setComment] = useState(player.comment);

  const keyDownHandler = (event) => {
    if (event.key === "Delete" && !isCommenting && isSelected) {
      event.preventDefault();
      store.dispatch({ type: "players/playerRemoved", payload: player.name });
    } else if (event.key === "Backspace" && isSelected && !isCommenting) {
      event.preventDefault();
      setIsCommenting(false);
      store.dispatch({
        type: "players/clearPlayerCharacter",
        payload: { name: player.name },
      });
    } else if (event.key === "Enter" && isSelected && !isCommenting) {
      event.preventDefault();
      setIsCommenting(true);
    } else if (event.key === "Enter" && isSelected && comment !== "") {
      event.preventDefault();
      setIsCommenting(false);
      store.dispatch({
        type: "players/commentAddedtoPlayer",
        payload: { name: player.name, comment: comment },
      });
    }
  };

  useEffect(() => {
    if (!isSelected) {
      setIsCommenting(false);
    }
  }, [isSelected]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className={"player-container " + (isSelected ? "focused" : "")}>
      <h1>
        {player.name} {player.character && " - " + player.character}
      </h1>
      {player.character === "" && (
        <AutocompleteInput isSelected={isSelected} player={player} />
      )}
      {isCommenting && (
        <input
          type="text"
          className="player-comment-input"
          placeholder="Enter a comment"
          autoFocus={true}
          value={comment}
          onBlur={() => setIsCommenting(false)}
          onChange={(e) => setComment(e.target.value)}
        />
      )}
      {player.comment !== "" && !isCommenting && (
        <p className="player-comment">"{player.comment}"</p>
      )}
      <p className="player-characters">
        {player.charactersPlayed.map((character, index) => {
          return character.character + " (" + character.amount_played + ") ";
        })}
      </p>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    selected: state.selected,
  };
};

export default connect(mapStatetoProps)(PlayerBox);
