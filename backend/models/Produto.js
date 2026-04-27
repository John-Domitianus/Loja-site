const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  valor: Number,
  quantidade: Number,
});

module.exports = mongoose.model("Produto", ProdutoSchema);