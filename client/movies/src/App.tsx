import { useState } from "react";
import "./App.css";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  return (
    <>
      <div>
        <input onChange={(event) => setQuery(event.target.value)}></input>
        <button
          onClick={() =>
            axios
              .get(`http://localhost:4000/search/${query}`)
              .then((response) => setResult(response.data))
          }
        >
          Search Movies
        </button>

        {result.map((element) => (
          <div>{element.title}</div>
        ))}
      </div>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <p>Norman Qian</p>
        <p>Movies Page</p>
        <img></img>
      </div>
      <div className="card">
        <p>Favorites</p>
        <ul>
          <li>asdf</li>
          <li>gfdgsdfg</li>
          <li>sdfgsd</li>
        </ul>
      </div>
      <Search></Search>
      <br />
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users")
            .then((response) => console.log(response.data))
        }
      >
        Browse Users
      </button>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/movies")
            .then((response) => console.log(response.data))
        }
      >
        Browse Movies
      </button>
    </>
  );
}

export default App;
