import request from "supertest";
import { assert } from "chai";
import { server } from "../../../app/server";
import { IUser } from "../../../app/interfaces/user.interface";

describe("api/users", () => {
  let user: IUser;
  
  before(async () => {
    console.log("START TESTING.");
    server;
  });

  after((done) => {
    server.close(done);
    console.log("FINISH TESTING.");
  });

  describe("GET", () => {
    it("GET /api/users, expect 200", () => {
      return request(server).get("/api/users").expect(200);
    });

    it("GET /api/users/777, UUID wrong, expect 400", () => {
      return request(server).get("/api/users/777").expect(400);
    });

    it("GET /api/users/44c90064-8a53-40e7-bc90-3ca94d8b23e, UUID wrong, expect 400", async () => {
      return request(server)
        .get("/api/users/44c90064-8a53-40e7-bc90-3ca94d8b23e")
        .expect(400);
    });

    it("GET /api/users/44c90064-8a53-40e7-bc90-3ca94d8b23ec, UUID doesn't exist, expect 404", async () => {
      return request(server)
        .get("/api/users/44c90064-8a53-40e7-bc90-3ca94d8b23ec")
        .expect(404);
    });

    it("GET /api/users response should contains 100 users", async () => {
      const res: request.Response = await request(server).get("/api/users");
      user = res.body[0];
      assert.lengthOf(res.body, 100, "response contains 100 users");
    });
  });
  describe("POST", () => {
    it("POST /api/users, expect 201", async () => {
      return await request(server)
        .post("/api/users")
        .send({
          username: "Moshiach",
          age: 120,
          hobbies: "['walking', 'storytelling']",
        })
        .expect(201);
    });

    it("GET /api/users response should contains 101 users", async () => {
      const res: request.Response = await request(server).get("/api/users");
      assert.lengthOf(res.body, 101, "response contains 101 users");
    });

    it("POST /api/users request body does contain wrong fields, expect 400", async () => {
      return await request(server)
        .post("/api/users")
        .send({
          abusername: "Moshiach",
          age: 120,
          hobbies: "['walking', 'storytelling']",
        })
        .expect(400);
    });

    it("POST /api/users request body does not contain required fields, expect 400", async () => {
      return await request(server).post("/api/users").send({}).expect(400);
    });
  });
  describe("PUT", () => {
    it("PUT /api/users/{userId}, expect 200", async () => {
      return await request(server)
        .put(`/api/users/${user.id}`)
        .send({
          username: "Moshiach",
          age: 120,
          hobbies: "['walking', 'legislating', 'storytelling']",
        })
        .expect(200);
    });

    it("GET /api/users/updatedUser, updated username saved id DB", async () => {
      const res: request.Response = await request(server).get(`/api/users/${user.id}`);
      assert.equal(
        res.body.username,
        "Moshiach",
        "updated username saved id DB"
      );
    });

    it("PUT /api/users/{userId} userId is invalid (not uuid), expect 400", async () => {
      return await request(server)
        .put(`/api/users/123456789`)
        .send({
          username: "Moshiach",
          age: 120,
          hobbies: "['walking', 'legislating', 'storytelling']",
        })
        .expect(400);
    });

    it("PUT /api/users/{userId} record with id === userId doesn't exist, expect 404", async () => {
      return await request(server)
        .put(`/api/users/ef72c9f6-12e0-4266-9df1-a2ffcee45428`)
        .send({
          username: "Moshiach",
          age: 120,
          hobbies: "['walking', 'legislating', 'storytelling']",
        })
        .expect(404);
    });
  });
  describe("DELETE", () => {
    it("DELETE /api/users/44c90064-8a53-40e7-bc90-3ca94d8b23ec, expect 204", async () => {
      return request(server).delete(`/api/users/${user.id}`).expect(204);
    });

    it("GET /api/users response should contains 100 users", async () => {
      const res = await request(server).get("/api/users");
      assert.lengthOf(res.body, 100, "response contains 100 users");
    });

    it("DELETE /api/users/123456789 userId is invalid (not uuid), expect 400", async () => {
      return request(server).delete(`/api/users/123456789`).expect(400);
    });

    it("PUT /api/users/{userId} record with id === userId doesn't exist, expect 404", async () => {
      return await request(server)
        .delete(`/api/users/ef72c9f6-12e0-4266-9df1-a2ffcee45428`)
        .expect(404);
    });
  });
  describe("NON EXISTING RESOURCE", () => {
    it("GET /some-non/existing/resource, expect 404", () => {
      return request(server).get("/some-non/existing/resource").expect(404);
    });
  });
});
