import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const cliente = new MongoClient(connectionString);

let conexion;
try {
  conexion = await cliente.connect();
} catch(e) {
  console.error(e);
}

let baseDeDatos = conexion.db("login");

export default baseDeDatos;
