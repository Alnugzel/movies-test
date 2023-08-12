const request = require("supertest");
const app = require("../app");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

require("../models");
let movieId;

const URL_MOVIE = "/api/v1/movies";

const movie = {
  name: "The irishman",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Teaser-trailer-for-martin-scorseses-the-irishman-social.jpg/270px-Teaser-trailer-for-martin-scorseses-the-irishman-social.jpg",
  synopsis:
    " es una película épica de gánsteres estadounidense de 2019, producida y dirigida por Martin Scorsese y escrita por Steven Zaillian, basada en el libro biográfico I Heard You Paint Houses, de Charles Brandt.",
  releaseYear: 2019,
};

test(`POST -> '${URL_MOVIE}' should return status code 201 req.body === movie.name`, async () => {
  const res = await request(app).post(URL_MOVIE).send(movie);

  movieId = res.body.id;

  console.log(res.body);

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test(`GET -> '${URL_MOVIE}' should return status code 200`, async () => {
  const res = await request(app).get(URL_MOVIE);

  expect(res.status).toBe(200);

  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].actors).toHaveLength(0);

  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].directors).toHaveLength(0);

  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].genres).toHaveLength(0);
});

test(`GET -> '${URL_MOVIE}/:id' should return status code 200, res.body to be defined and res.body.name === movie.name`, async () => {
  const res = await request(app).get(`${URL_MOVIE}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test(`PUT -> '${URL_MOVIE}/:id' should return status code 200, res.body.name === movieUpdate.name`, async () => {
  const movieUpdate = {
    name: "Stardust",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Stardust_promo_poster.jpg/220px-Stardust_promo_poster.jpg",
    synopsis:
      "The film follows Tristan, a young man from the fictional town of Wall in England. Wall is a town on the border of the magical fantasy kingdom of Stormhold. ",
    releaseYear: 2007,
  };

  const res = await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdate.name);
});

//--------------------------ACTOR-------------------------------------------------------

test(`POST -> '${URL_MOVIE}/:id/actors', should retrun status code 200 and res.body.length === 1  `, async () => {
  const actor = {
    firstName: "Charles",
    lastName: "Chaplin",
    nationality: "British",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Charlie_Chaplin_portrait.jpg/220px-Charlie_Chaplin_portrait.jpg",
    birthday: 1889 / 12 / 16,
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);

  await createActor.destroy();
});

//--------------------------DIRECTOR-------------------------------------------------------

test(`POST -> '${URL_MOVIE}/:id/directors', should retrun status code 200 and res.body.length === 1  `, async () => {
  const director = {
    firstName: "Martin",
    lastName: "Scorsese",
    nationality: "American",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Martin_Scorsese_Berlinale_2010_%28cropped2%29.jpg/220px-Martin_Scorsese_Berlinale_2010_%28cropped2%29.jpg",
    birthday: 1942 / 11 / 17,
  };

  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);

  await createDirector.destroy();
});

//--------------------------GENRE-------------------------------------------------------

test(`POST -> '${URL_MOVIE}/:id/genres', should retrun status code 200 and res.body.length === 1  `, async () => {
  const genre = {
    name: "Comedy",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/genres`)
    .send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);

  await createGenre.destroy();
});

//-------------------------------------------------------------------------------------

test(`DELETE -> ${URL_MOVIE}/:id should return status code 204`, async () => {
  const res = await request(app).delete(`${URL_MOVIE}/${movieId}`);

  expect(res.status).toBe(204);
});
