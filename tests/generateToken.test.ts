import { after, describe, it } from "node:test";
import assert from "node:assert";
import instance from "../src/index";
import request from "supertest";

describe("generateToken", () => {
  it("should return a token for a valid email", async () => {
    const email = "abc@gmail.com";
    await request(instance)
      .post("/api/token")
      .send({ email })
      .expect(200)
      .then((response) => {
        assert(response.body.token);
      });
  });

  it("should return an error for an invalid email", async () => {
    const email = "abc";
    await request(instance)
      .post("/api/token")
      .send({ email })
      .expect(400)
      .then((response) => {
        assert(response.body.error);
      });
  });

  it("should return an error for a missing email", async() => {
    await request(instance)
      .post("/api/token")
      .expect(400)
      .then((response) => {
        assert(response.body.error);
      });
  });

  it("should return an error for a non-string email", async () => {
    const email = 123;
    await request(instance)
      .post("/api/token")
      .send({ email })
      .expect(400)
      .then((response) => {
        assert(response.body.error);
      });
  });
});

after(() => {
  instance.close();
});
