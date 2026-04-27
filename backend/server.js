const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✔ CONEXÃO COM BANCO (Railway ou Mongo Atlas)
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/loja";

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

// ROTAS
const produtoRoutes = require(path.join(__dirname, "routes", "produtoRoutes"));
app.use("/produtos", produtoRoutes);

const vendaRoutes = require(path.join(__dirname, "routes", "vendaRoutes"));
app.use("/vendas", vendaRoutes);

// ROTA DE TESTE
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// ERRO GLOBAL
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

// ✔ PORTA CORRETA PARA RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});