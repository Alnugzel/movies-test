const request = require("supertest");
const app = require("../app");
const Director = require("../models/Director");
let directorId;

const URL_DIRECTOR = "/api/v1/directors";

const director = {
  firstName: "Martin",
  lastName: "Scorsese",
  nationality: "American",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Martin_Scorsese_Berlinale_2010_%28cropped2%29.jpg/220px-Martin_Scorsese_Berlinale_2010_%28cropped2%29.jpg",
  birthday: 1942 / 11 / 17,
};

test(`POST -> '${URL_DIRECTOR}' should return status code 201 req.body === director.name`, async () => {
  const res = await request(app).post(URL_DIRECTOR).send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test(`GET -> '${URL_DIRECTOR}' should return status code 200`, async () => {
  const res = await request(app).get(URL_DIRECTOR);

  expect(res.status).toBe(200);
});

test(`GET -> '${URL_DIRECTOR}/:id' should return status code 200, res.body to be defined and res.body.name === director.name`, async () => {
  const res = await request(app).get(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test(`PUT -> '${URL_DIRECTOR}/:id' should return status code 200, res.body.name === directorUpdate.name`, async () => {
  const directorUpdate = {
    firstName: "Robert",
    lastName: "De Niro",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Robert_De_Niro_Cannes_2016.jpg/220px-Robert_De_Niro_Cannes_2016.jpg",
    birthday: 1943 / 8 / 17,
  };

  const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(directorUpdate.name);
});

test(`DELETE -> ${URL_DIRECTOR}/:id should return status code 204`, async () => {
  const res = await request(app).delete(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(204);
});
