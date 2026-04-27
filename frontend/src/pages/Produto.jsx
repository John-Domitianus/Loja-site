import { useState } from "react";
import axios from "axios";

const API = "https://bella-boutique.up.railway.app";

export default function Produto() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");

  async function salvar() {
    try {
      await axios.post(`${API}/produtos`, {
        nome,
        categoria,
        valor: Number(valor),
        quantidade: Number(quantidade),
      });

      alert("Produto salvo!");

      setNome("");
      setCategoria("");
      setValor("");
      setQuantidade("");

    } catch (err) {
      console.error(err);
      alert("Erro ao salvar produto");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900">Adicionar Produto</h2>

      <input
        className="w-full p-3 border rounded-xl"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl"
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl"
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <button
        onClick={salvar}
        className="bg-blue-600 text-white py-3 rounded-xl"
      >
        Salvar Produto
      </button>
    </div>
  );
}