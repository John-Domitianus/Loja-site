const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONEXÃO COM O BANCO
mongoose.connect("mongodb://127.0.0.1:27017/loja")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

// ROTAS
const produtoRoutes = require(path.join(__dirname, "routes", "produtoRoutes"));
app.use("/produtos", produtoRoutes);

// 👉 NOVO: rotas de vendas
const vendaRoutes = require(path.join(__dirname, "routes", "vendaRoutes"));
app.use("/vendas", vendaRoutes);

// ROTA DE TESTE
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// TRATAMENTO DE ERRO GLOBAL (opcional, mas útil)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

// START SERVER
app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando em http://localhost:3000");
});