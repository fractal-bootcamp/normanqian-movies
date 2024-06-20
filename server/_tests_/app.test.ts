import request from "supertest";

import app from "../server";

describe("Test app.ts", () => {
  test("Ping", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({});
  });
});
