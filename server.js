const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    jarvis: "online",
    mensaje: "Buenas, jefe. Jarvis está funcionando."
  });
});

app.post("/hablar", (req, res) => {
  const mensaje = req.body.mensaje || "";

  res.json({
    respuesta: `Recibido, jefe. Dijiste: ${mensaje}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Jarvis escuchando en el puerto ${PORT}`);
});