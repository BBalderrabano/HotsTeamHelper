import React, {useState} from "react";
import {connect} from "react-redux";
import "./styles.css";
import PlayerBox from "../player-box";

function PlayerBoxContainer({players}) {

  return (
    <div className="player-box-container">
      {players.map((player, index) => {
        return <PlayerBox key={index} player={player} />;
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    players: state.players,
  };
}

export default connect(mapStateToProps)(PlayerBoxContainer);
