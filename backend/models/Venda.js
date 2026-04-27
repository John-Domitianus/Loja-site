const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  produtoId: String,
  nome: String,
  quantidade: Number,
  valorUnit: Number,
  subtotal: Number
});

const VendaSchema = new mongoose.Schema({
  cliente: String,
  dataCompra: Date,
  formaPagamento: String,
  parcelado: Boolean,
  parcelas: Number,
  valorTotal: Number,
  itens: [ItemSchema]
});

module.exports = mongoose.model("Venda", VendaSchema);