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
  test("Get all Movies", async () => {
    const res = await request(app).get("/movies");
    expect(res.body).toEqual([]);
  });
});

describe("Search", () => {
  test("Get all Movies", async () => {
    const res = await request(app).get("/search/:query");
    expect(res.body).toEqual([]);
  });
});

describe("Favorite", () => {
  test("Get all Movies", async () => {
    const res = await request(app).get("/search/:query");
    expect(res.body).toEqual([]);
  });
});
