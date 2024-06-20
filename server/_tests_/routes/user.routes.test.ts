import request from "supertest";

import app from "../../server";

describe("User routes", () => {
  test("Get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.body).toEqual([
      {
        id: 1,
        name: "Norman",
      },
      {
        id: 2,
        name: "David",
      },
    ]);
  });
});

describe("Movie routes", () => {
  test("Get all movies", async () => {
    const res = await request(app).get("/movies");
    expect(res.body).toEqual([
      {
        id: 1,
        title: "Godfather",
        details: "Al Pacino and Marlon Brando",
      },
      {
        id: 2,
        title: "Toy Story",
        details: "Buzz Lightyear and Woody",
      },
      {
        id: 3,
        title: "fatestay",
        details: "sword of promised victory",
      },
    ]);
  });
});

describe("Search routes", () => {
  test("Search for movie", async () => {
    const res = await request(app).get("/search/toy");
    expect(res.body).toEqual([
      {
        id: 2,
        title: "Toy Story",
        details: "Buzz Lightyear and Woody",
      },
    ]);
  });
});

describe("Single movie routes", () => {
  test("Get specific movie", async () => {
    const res = await request(app).get("/movies/1");
    expect(res.body).toEqual({
      id: 1,
      title: "Godfather",
      details: "Al Pacino and Marlon Brando",
    });
  });
});

describe("Single user routes", () => {
  test("Get specific user", async () => {
    const res = await request(app).get("/users/1");
    expect(res.body).toEqual({
      id: 1,
      name: "Norman",
    });
  });
});

describe("User's favorites", () => {
  test("See Favorites", async () => {
    const res = await request(app).get("/users/2/favorites");
    expect(res.body.favorites).toEqual([
      {
        details: "Buzz Lightyear and Woody",
        id: 2,
        title: "Toy Story",
      },
      {
        details: "sword of promised victory",
        id: 3,
        title: "fatestay",
      },
    ]);
  });
});

describe("Post Request", () => {
  test("Toggle Favorite", async () => {
    const res = await request(app).post("/movies/3/2");
    expect(res.body).toEqual({
      id: 3,
      title: "fatestay",
      details: "sword of promised victory",
    });
  });
});
