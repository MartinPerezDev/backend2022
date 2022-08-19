import { Contenedor } from "./Class/Contenedor.js";

const fileSystem = new Contenedor("texto.json");
const obj = {
  title: "producto 1",
  price: 223,
  thumbnail: "https://plataforma.coderhouse.com/",
};
const obj2 = {
  title: "producto 2",
  price: 455,
  thumbnail: "https://plataforma.coderhouse.com/",
};
const obj3 = {
  title: "producto 3",
  price: 6788,
  thumbnail: "https://plataforma.coderhouse.com/",
};
const main = async () => {
  await fileSystem.verifiedArchive();
  await fileSystem.save(obj);
  await fileSystem.save(obj2);
  await fileSystem.save(obj3);
  console.log(await fileSystem.getAll());
  console.log(await fileSystem.getById(2));
  await fileSystem.deleteById(2);
  console.log(await fileSystem.getAll());
  await fileSystem.deleteAll();
};

main();
