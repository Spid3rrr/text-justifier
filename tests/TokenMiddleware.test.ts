import { after, describe, it } from "node:test";
import assert from "node:assert";
import instance from "../src/index";
import request from "supertest";

describe("TokenMiddleware", () => {
  it("should return an error for a missing token", async () => {
    await request(instance)
      .post("/api/justify")
      .expect(401)
      .then((response) => {
        assert(response.body.error);
      });
  });

  it("should return an error for an invalid token", async () => {
    await request(instance)
      .post("/api/justify")
      .set("Authorization", "Bearer invalidtoken")
      .expect(401)
      .then((response) => {
        assert(response.body.error);
      });
  });
});

after(() => {
  instance.close();
});
