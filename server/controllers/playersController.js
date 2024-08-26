const fs = require("fs");

let players_db = JSON.parse(
  fs.readFileSync("./data/players.json", "utf8", (err, data) => {
    if (err) throw err;
  })
);

let characters = JSON.parse(
  fs.readFileSync("./data/characters.json", "utf8", (err, data) => {
    if (err) throw err;
  })
);

exports.getAllPlayers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: players_db.length,
    data: {
      players: players_db.players,
    },
  });
};

exports.saveAllPlayers = (req, res) => {
  let _players = req.body.players;

  for (let i = 0; i < _players.length; i++) {
    let _player = _players[i];

    let player_exists = players_db.players.find(
      (player) => player.name === _player.name
    );

    if (player_exists) {
      let character_exist = player_exists.charactersPlayed.find(
        (data) => data.character === _player.character
      );

      player_exists.comment = _player.comment;

      if (character_exist) {
        character_exist.amount_played += 1;
      } else {
        player_exists.charactersPlayed.push({
          character: _player.character,
          amount_played: 1,
        });
      }
    } else {
      _player.charactersPlayed.push({
        character: _player.character,
        amount_played: 1,
      });
      players_db.players.push({
        name: _player.name,
        charactersPlayed: _player.charactersPlayed,
        comment: _player.comment,
      });
    }
  }

  fs.writeFile("./data/players.json", JSON.stringify(players_db), (err) => {
    if (err && err !== null) {
      res.status(400).json({
        status: "error",
        data: err,
      });
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      players: players_db.players,
    },
  });
};

exports.getAllCharacters = (req, res) => {
  let _characters = characters.characters;

  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).json({
    status: "success",
    results: characters.length,
    data: {
      characters: _characters,
    },
  });
};
