import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import instance from "../src/index";
import request from "supertest";

let token: string;

before(async () => {
  const email = "abc@gmail.com";
  await request(instance)
    .post("/api/token")
    .send({ email })
    .expect(200)
    .then((response) => {
      token = response.body.token;
    });
});

describe("AllowanceMiddleware", () => {
  it("should return a 200 response for available allowance", async () => {
    await request(instance)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Hello World" })
      .expect(200)
      .then((response) => {
        assert(response.text);
      });
  });

  it("should return an error when we exceed daily limit", async () => {
    // exhaust daily limit
    for (let i = 0; i < 10; i++) {
      await request(instance)
        .post("/api/justify")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "Hello World ".repeat(3750) });
    }
    // daily limit should be at (80000 - 2) - (3250 * 2 * 10) = 4998
    // we try to send a 5000 words text
    await request(instance)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Hello World ".repeat(2500) })
      .expect(402)
      .then((response) => {
        assert(response.error);
      });
  });
});

after(() => {
  instance.close();
});
