import applicationReducer from "../reducers/applicationReducer.js";
import { getAllCharacters } from "../services/characters.js";
import { getAllPlayers } from "../services/players.js";

function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  dispatch({ type: "@@redux/INIT" });

  return { dispatch, subscribe, getState };
}

const initialState = {
  players: [],
  selected: "main",
  characters: [],
  players_db: []
};

//http://localhost:3000/api/v1/characters


const store = createStore(applicationReducer, initialState);

getAllPlayers().then((players) => {
  store.dispatch({ type: "players/playersLoaded", payload: players });
});

getAllCharacters().then((characters) => {
  store.dispatch({ type: "characters/charactersLoaded", payload: characters });
});

export default store;
