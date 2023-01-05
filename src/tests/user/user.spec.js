import request from "supertest";
import { server } from "../../app/server";
import { assert } from "chai";

describe("/api/users", () => {
  let start;

  before(async () => {
    start = server;
  });

  after((done) => {
    start.close(done);
  });
  
  it("GET /api/users", () => {
    return request(start).get("/api/users").expect(200);
  });
  
  it("GET /api/users/777", () => {
    return request(start).get("/api/users/777").expect(400);
  });
  
  it("response should contains 100 users", async () => {
    const res = await request(start).get("/api/users");
    assert.lengthOf(res.body, 100, "response contains 100 users");
  });
});
