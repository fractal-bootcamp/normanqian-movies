import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <div>
        <input onChange={(event) => setQuery(event.target.value)}></input>
        <button
          onClick={() =>
            axios
              .get(`http://localhost:4000/search/${query}`)
              .then((response) => console.log(response.data))
          }
        >
          pressbutton
        </button>
      </div>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={() =>
            axios
              .get("http://localhost:4000/")
              .then((response) => console.log(response.data))
          }
        >
          apicall
        </button>
      </div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users")
            .then((response) => console.log(response.data))
        }
      >
        callAPI
      </button>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/movies")
            .then((response) => console.log(response.data))
        }
      >
        callAPI2
      </button>

      <Search></Search>
    </>
  );
}

export default App;
