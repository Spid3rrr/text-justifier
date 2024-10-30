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

describe("justifyText", () => {
  it("should return an error for a missing text", async () => {
    await request(instance)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((response) => {
        assert(response.body.error);
      });
  });
  it("should return a justified text", async () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat augue ut pharetra aliquet. Sed volutpat turpis in odio hendrerit pharetra. Maecenas vehicula, nunc vel gravida pellentesque, dolor erat lobortis leo, et varius leo erat in tortor. Aenean est mi, consectetur ut eros nec, lacinia mattis metus. Integer commodo pretium purus, at egestas nunc. Praesent eget pharetra lorem. Donec ut nulla in velit faucibus pulvinar. Fusce feugiat neque orci, quis blandit odio iaculis lacinia.

Nunc dignissim diam nec urna auctor, ut cursus odio volutpat. Mauris eget felis at eros dapibus tincidunt nec non diam. Etiam iaculis, nibh sed sollicitudin tempus, diam felis tincidunt lectus, vel vulputate elit tellus eget mi. Nullam sollicitudin fringilla lacus, a aliquam mi varius nec. Aliquam erat volutpat. Nulla laoreet, lacus vitae accumsan elementum, libero sem semper augue, id consectetur tortor magna eu turpis. Vestibulum congue id diam vel commodo. Aliquam ut rutrum ex. Nunc feugiat risus vitae dolor auctor fermentum. Aliquam nulla velit, egestas maximus pulvinar sed, dictum sit amet neque. Duis vitae tincidunt sem. Morbi facilisis odio hendrerit efficitur vehicula.
    `;
    const result = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat augue ut
pharetra  aliquet.  Sed  volutpat  turpis  in  odio hendrerit pharetra. Maecenas
vehicula,  nunc vel gravida pellentesque, dolor erat lobortis leo, et varius leo
erat  in  tortor.  Aenean est mi, consectetur ut eros nec, lacinia mattis metus.
Integer  commodo  pretium  purus, at egestas nunc. Praesent eget pharetra lorem.
Donec  ut  nulla  in  velit  faucibus  pulvinar.  Fusce feugiat neque orci, quis
blandit odio iaculis lacinia.
Nunc  dignissim diam nec urna auctor, ut cursus odio volutpat. Mauris eget felis
at  eros  dapibus  tincidunt  nec non diam. Etiam iaculis, nibh sed sollicitudin
tempus,  diam  felis tincidunt lectus, vel vulputate elit tellus eget mi. Nullam
sollicitudin  fringilla  lacus,  a aliquam mi varius nec. Aliquam erat volutpat.
Nulla  laoreet,  lacus  vitae  accumsan  elementum,  libero sem semper augue, id
consectetur  tortor  magna  eu  turpis.  Vestibulum  congue id diam vel commodo.
Aliquam  ut  rutrum ex. Nunc feugiat risus vitae dolor auctor fermentum. Aliquam
nulla  velit,  egestas  maximus  pulvinar sed, dictum sit amet neque. Duis vitae
tincidunt sem. Morbi facilisis odio hendrerit efficitur vehicula.`;
    await request(instance)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: text })
      .expect(200)
      .then((response) => {
        assert(response.text);
        assert.strictEqual(response.text, result);
      });
  });
});

after(() => {
  instance.close();
});
