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
          Search
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
        <button
          onClick={() =>
            axios
              .get("http://localhost:4000/")
              .then((response) => console.log(response.data))
          }
        >
          testCall
        </button>
      </div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users")
            .then((response) => console.log(response.data))
        }
      >
        getUsers
      </button>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/movies")
            .then((response) => console.log(response.data))
        }
      >
        getMovies
      </button>

      <Search></Search>
    </>
  );
}

export default App;
