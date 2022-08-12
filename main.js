import { Usuario } from "./class/Usuarios.js";
const mascotas = ["Gato", "Perro"]
const user = new Usuario("Juan", "Martin", [{ nombre: "libro 1", autor: "autor 1" }], mascotas)

const main = ()=>{
    console.log(user.getFullName())
    user.addMascota("Axolote")
    console.log(user.countMascotas())
    user.addBook("libro2", "autor2")
    console.log(user.getBookNames())
}
main()