const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
let actorId;

const URL_ACTOR = "/api/v1/actors";

const actor = {
  firstName: "Charles",
  lastName: "Chaplin",
  nationality: "British",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Charlie_Chaplin_portrait.jpg/220px-Charlie_Chaplin_portrait.jpg",
  birthday: 1889 / 12 / 16,
};

test(`POST -> '${URL_ACTOR}' should return status code 201 req.body === actor.name`, async () => {
  const res = await request(app).post(URL_ACTOR).send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

test(`GET -> '${URL_ACTOR}' should return status code 200`, async () => {
  const res = await request(app).get(URL_ACTOR);

  expect(res.status).toBe(200);
});

test(`GET -> '${URL_ACTOR}/:id' should return status code 200, res.body to be defined and res.body.name === actor.name`, async () => {
  const res = await request(app).get(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

test(`PUT -> '${URL_ACTOR}/:id' should return status code 200, res.body.name === actorUpdate.name`, async () => {
  const actorUpdate = {
    firstName: "Robert",
    lastName: "De Niro",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Robert_De_Niro_Cannes_2016.jpg/220px-Robert_De_Niro_Cannes_2016.jpg",
    birthday: 1943 / 8 / 17,
  };

  const res = await request(app)
    .put(`${URL_ACTOR}/${actorId}`)
    .send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actorUpdate.name);
});

test(`DELETE -> ${URL_ACTOR}/:id should return status code 204`, async () => {
  const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(204);
});
