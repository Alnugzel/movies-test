const request = require("supertest");
const Genre = require("../models/Genre");
const app = require("../app.js");

let genreId;

const URL_GENRE = "/api/v1/genres";

const genre = {
  name: "Action",
};

test(`POST -> '${URL_GENRE}' should return status code 201 req.body === genre.name `, async () => {
  const res = await request(app).post(URL_GENRE).send(genre);

  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test(`GET -> '${URL_GENRE}' should return status code 200 `, async () => {
  const res = await request(app).get(URL_GENRE);

  console.log(res.status);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test(`GET -> '${URL_GENRE}/:id' should return status code 200, res.body to be defined and res.body.name === genre.name`, async () => {
  const res = await request(app).get(`${URL_GENRE}/${genreId}`);

  console.log(res.status);
  expect(res.status).toBe(200);
});

test(`PUT -> ${URL_GENRE}/:id should return status code 200, res.body.name === genreUpdate.name `, async () => {
  const genreUpdate = {
    name: "Drama",
  };

  const res = await request(app)
    .put(`${URL_GENRE}/${genreId}`)
    .send(genreUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genreUpdate.name);
});

test(`DELETE -> ${URL_GENRE}/:id should return status code 204 `, async () => {
  const res = await request(app).delete(`${URL_GENRE}/${genreId}`);
  expect(res.status).toBe(204);
});
