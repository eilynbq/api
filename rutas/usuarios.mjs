import express from "express";
import db from "../mongo/coneccion.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let nuevoUsuario = await db.collection("user");
  let resultados = await nuevoUsuario.find({}).toArray();

  res.send(resultados).status(200);
});

router.get("/user/:id", async (req, res) => {
  let collection = await db.collection("user");
  //let query = req.params.id;
 
  let query = req.params.id;
  console.log(JSON.parse(query))
  let result = await collection.findOne(JSON.parse(query));

  if (!result) res.send({result:"usuaario no encontrado"}).status(404);
  else res.send(result).status(200);
});



router.post("/create", async (req, res) => {
  let nuevoUsuario = await db.collection("user");
  let usuario = req.body;
  let resultado = await nuevoUsuario.insertOne(usuario);
  res.send(resultado).status(204);
});

router.put("/update/:id", async (req, res) => {
  const consulta = { _id: ObjectId(req.params.id) };
  const actualizaciones = req.body;
  let nuevoUsuario = await db.collection("user");
  let resultado = await nuevoUsuario.findOneAndUpdate(consulta, { $set: actualizaciones });

  res.send(resultado).status(200);
});

router.delete("/delete/:id", async (req, res) => {
  const consulta = { _id: ObjectId(req.params.id) };
  const usuario = db.collection("user");
  let resultado = await usuario.deleteOne(consulta);
  res.send(resultado).status(200);
});


export default router;
