import express from "express";
import { Contenedor } from "./Class/Contenedor.js";

const app = express();

const server = app.listen(8080, () => console.log("server up!!"));
server.on("error", (error) => console.log(`Error en el servidor`));

let numeroAleatorio = 0;
let productoRandom = [];
const fileSystem = new Contenedor("data.json");

const main = async () => {
  const productos = await fileSystem.getAll();

  app.get("/productos", (req, res) => {
    res.json(productos);
  });
  app.get("/productoRandom", (req, res) => {
    numeroAleatorio = Math.floor(Math.random() * productos.length) + 1;
    productoRandom = productos.find((prod) => prod.id === numeroAleatorio);
    res.json(productoRandom);
  });
};
main();
