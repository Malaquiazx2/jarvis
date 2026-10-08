const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    jarvis: "online",
    mensaje: "Buenas, jefe. Jarvis está funcionando."
  });
});

app.post("/hablar", async (req, res) => {
  const mensaje = req.body.mensaje || "";

  if (!mensaje) {
    return res.status(400).json({
      error: "No recibí ningún mensaje."
    });
  }

  try {
    const respuesta = await openai.responses.create({
      model: "gpt-5",
      instructions:
        "Sos Jarvis, un asistente personal inteligente. Respondé en español, de forma clara, útil y natural.",
      input: mensaje
    });

    res.json({
      respuesta: respuesta.output_text
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No pude conectarme con la inteligencia de Jarvis."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Jarvis escuchando en el puerto ${PORT}`);
});