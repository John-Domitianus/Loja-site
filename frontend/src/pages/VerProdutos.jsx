import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.18.70:3000";

export default function VerProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await axios.get(`${API}/produtos`);
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar produtos");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-gray-900">Estoque</h2>

      {produtos.length === 0 && (
        <p>Nenhum produto cadastrado</p>
      )}

      {produtos.map((p) => (
        <div key={p._id} className="bg-white border p-3 rounded-xl shadow-sm">
          <b>{p.nome}</b>
          <p>Categoria: {p.categoria}</p>
          <p>R$ {p.valor}</p>
          <p>Estoque: {p.quantidade}</p>
        </div>
      ))}
    </div>
  );
}