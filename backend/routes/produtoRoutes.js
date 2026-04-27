const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");

// 🔹 Criar produto
router.post("/", async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔹 Listar produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔥 EDITAR PRODUTO
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!atualizado) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔥 EXCLUIR PRODUTO
router.delete("/:id", async (req, res) => {
  try {
    const deletado = await Produto.findByIdAndDelete(req.params.id);

    if (!deletado) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json({ msg: "Produto deletado" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;