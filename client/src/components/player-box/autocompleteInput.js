import React, { useRef, useEffect, useState, useContext } from "react";
import { connect, ReactReduxContext } from "react-redux";
import "./styles.css";

const AutocompleteInput = ({ isSelected, player, characters }) => {
  const { store } = useContext(ReactReduxContext);

  let inputRef = useRef();
  let [guessedCharacter, setguessedCharacter] = useState("");
  let [mostLikelyCharacter, setMostLikelyCharacter] = useState("");

  useEffect(() => {
    if (player.character === "") {
      if (isSelected) {
        inputRef.current.focus();
      } else {
        setMostLikelyCharacter("");
        setguessedCharacter("");
        inputRef.current.blur();
      }
    }
  }, [isSelected]);

  const keyDownHandler = (event) => {
    if(isSelected && event.key === "Enter"){
      event.preventDefault();
      inputRef.current.blur();
      setguessedCharacter("");
      setMostLikelyCharacter("");
    }else if (
      player.character === "" &&
      event.key === " " &&
      mostLikelyCharacter !== "" &&
      isSelected
    ) {
      event.preventDefault();
      setguessedCharacter(mostLikelyCharacter);
      inputRef.current.blur();
      store.dispatch({
        type: "players/characterAddedtoPlayer",
        payload: { name: player.name, character: mostLikelyCharacter },
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const handleInputChange = (e) => {
    let input = e.target.value;
    let character = characters.find((character) =>
      character.toLowerCase().startsWith(input.toLowerCase())
    );

    if (input === "") {
      setMostLikelyCharacter("");
      setguessedCharacter("");
    } else if (character) {
      setMostLikelyCharacter(character);
      setguessedCharacter(input[0].toUpperCase() + input.slice(1));
    }
  };

  return (
    <div className="placeholder" data-placeholder={mostLikelyCharacter}>
      <input
        ref={inputRef}
        value={guessedCharacter}
        style={{ visibility: isSelected ? "visible" : "hidden" }}
        className="player-character-input"
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
  };
};

export default connect(mapStateToProps)(AutocompleteInput);
