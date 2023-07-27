import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import usuarios from "./rutas/usuarios.mjs";

const PORT = process.env.PORT || 8080 ;
const app = express();

app.use(cors());
app.use(express.json());

// carga las rutas
app.use("/usuarios", usuarios);
app.use((err, _req, res, next) => {
  console.log(err)
  res.status(500).send("Ha Ocurrido un error")
})

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`);
});
