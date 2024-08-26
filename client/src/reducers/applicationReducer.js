export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case "players/playerAdded": {
      return {
        ...state,
        players: [
          ...state.players,
          {
            name: action.payload.name,
            character: "",
            comment: action.payload.comment,
            charactersPlayed: action.payload.charactersPlayed,
          },
        ],
      };
    }
    case "players/playerRemoved": {
      return {
        ...state,
        selected: "main",
        players: state.players.filter(
          (player) => player.name !== action.payload
        ),
      };
    }
    case "players/clearPlayerCharacter": {
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.name === action.payload.name) {
            return {
              ...player,
              character: "",
            };
          }
          return player;
        }),
      };
    }
    case "players/commentAddedtoPlayer": {
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.name === action.payload.name) {
            return {
              ...player,
              comment: action.payload.comment,
            };
          }
          return player;
        }),
      };
    }
    case "characters/charactersLoaded": {
      let rawCharacterList = action.payload.data.characters;
      let characters = rawCharacterList.reduce((acc, character) => {
        acc.push(character.name);
        return acc;
      }, []);

      return {
        ...state,
        characters: characters,
      };
    }
    case "players/playersLoaded": {
      return {
        ...state,
        players_db: action.payload.data.players,
      };
    }
    case "players/characterAddedtoPlayer": {
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.name === action.payload.name) {
            return {
              ...player,
              character: action.payload.character,
            };
          }
          return player;
        }),
      };
    }
    case "application/changeSelection": {
      let possibleSelections = ["main"];

      possibleSelections.push(...state.players.map((player) => player.name));

      let currentSelection = state.selected;
      let currentIndex = possibleSelections.indexOf(currentSelection);
      let nextIndex = currentIndex + 1;

      if (nextIndex >= possibleSelections.length) {
        nextIndex = 0;
      }

      return {
        ...state,
        selected: possibleSelections[nextIndex],
      };
    }
    case "application/mainSelected":{
      return {
        ...state,
        selected: "main",
      }
    }
    case "application/clearApplication": {
      return {
        ...state,
        players: [],
        selected: "main",
        players_db: action.payload,
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
