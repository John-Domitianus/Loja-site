const express = require("express");
const router = express.Router();
const Venda = require("../models/Venda");
const Produto = require("../models/Produto");

// 🔹 Criar venda + baixar estoque
router.post("/", async (req, res) => {
  try {
    const { cliente, dataCompra, formaPagamento, parcelado, parcelas, itens } = req.body;

    let valorTotal = 0;

    for (const item of itens) {
      const produto = await Produto.findById(item.produtoId);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      if (produto.quantidade < item.quantidade) {
        return res.status(400).json({ erro: `Estoque insuficiente para ${produto.nome}` });
      }

      item.nome = produto.nome;
      item.valorUnit = produto.valor;
      item.subtotal = produto.valor * item.quantidade;

      valorTotal += item.subtotal;
    }

    for (const item of itens) {
      await Produto.findByIdAndUpdate(item.produtoId, {
        $inc: { quantidade: -item.quantidade }
      });
    }

    const venda = new Venda({
      cliente,
      dataCompra,
      formaPagamento,
      parcelado,
      parcelas,
      valorTotal,
      itens
    });

    await venda.save();

    res.json(venda);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔹 Listar vendas
router.get("/", async (req, res) => {
  try {
    const vendas = await Venda.find();
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔥 EDITAR VENDA
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Venda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!atualizado) {
      return res.status(404).json({ erro: "Venda não encontrada" });
    }

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔥 EXCLUIR VENDA
router.delete("/:id", async (req, res) => {
  try {
    const deletado = await Venda.findByIdAndDelete(req.params.id);

    if (!deletado) {
      return res.status(404).json({ erro: "Venda não encontrada" });
    }

    res.json({ msg: "Venda deletada" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;