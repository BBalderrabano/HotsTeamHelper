import logo from "./logo.svg";
import "./App.css";
import { useEffect, useContext } from "react";
import MainInput from "./components/main-input";
import { ReactReduxContext } from "react-redux";
import PlayerBoxContainer from "./components/player-box-container";

function App() {
  const { store } = useContext(ReactReduxContext);

  const handleKeyPress = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      store.dispatch({ type: "application/changeSelection" });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown",handleKeyPress);

    return () =>
      document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MainInput />
        <PlayerBoxContainer />
      </header>
    </div>
  );
}

export default App;
