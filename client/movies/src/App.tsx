import { useState } from "react";
import "./App.css";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  return (
    <div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users/2/favorites")
            .then((response) => setFavorites(response.data.favorites))
        }
      >
        See Favorites
      </button>
      {favorites.map((element, index) => (
        <div key={index}>
          {element.title}
          {element.id}
        </div>
      ))}
    </div>
  );
};

const UserList = () => {
  const [userList, setUserList] = useState([]);
  return (
    <div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users")
            .then((response) => setUserList(response.data))
        }
      >
        Browse Users
      </button>
      {userList.map((element, index) => (
        <div key={index}>
          {element.name}
          {element.id}
        </div>
      ))}
    </div>
  );
};

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  return (
    <div>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/movies")
            .then((response) => setMovieList(response.data))
        }
      >
        Browse Movies
      </button>
      {movieList.map((element, index) => (
        <div key={index}>
          {element.title}
          {element.id}
          {element.details}
        </div>
      ))}
    </div>
  );
};

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

        {result.map((element, index) => (
          <div key={index}>{element.title}</div>
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

      <div style={{ display: "flex" }}>
        <Favorites></Favorites>

        <UserList></UserList>
        <MovieList></MovieList>
      </div>

      <Search></Search>

      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/users/1")
            .then((response) => console.log(response.data))
        }
      >
        Specific User
      </button>
      <button
        onClick={() =>
          axios
            .get("http://localhost:4000/movies/1")
            .then((response) => console.log(response.data))
        }
      >
        Specific Movie
      </button>

      <button
        onClick={() =>
          axios
            .post("http://localhost:4000/movies/3/2")
            .then((response) => console.log(response.data))
        }
      >
        PostRequestHere
      </button>
    </>
  );
}

export default App;
