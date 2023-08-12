const express = require("express");
const routerActor = require("./actor.router");
const routerMovie = require("./movie.router");
const routerGenre = require("./genre.router");
const routerDirector = require("./director.router");
const router = express.Router();

// colocar las rutas aquí
router.use("/actors", routerActor);
router.use("/movies", routerMovie);
router.use("/genres", routerGenre);
router.use("/directors", routerDirector);

module.exports = router;
