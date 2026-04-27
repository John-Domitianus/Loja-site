import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.18.70:3000";

export default function Gerenciar() {
  const [aba, setAba] = useState("produtos");

  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [editProdutoId, setEditProdutoId] = useState(null);
  const [editVendaId, setEditVendaId] = useState(null);

  useEffect(() => {
    carregarProdutos();
    carregarVendas();
  }, []);

  async function carregarProdutos() {
    const res = await axios.get(`${API}/produtos`);
    setProdutos(res.data);
  }

  async function carregarVendas() {
    const res = await axios.get(`${API}/vendas`);
    setVendas(res.data);
  }

  async function deletarProduto(id) {
    if (!confirm("Excluir produto?")) return;
    await axios.delete(`${API}/produtos/${id}`);
    carregarProdutos();
  }

  async function salvarProduto(p) {
    await axios.put(`${API}/produtos/${p._id}`, p);
    setEditProdutoId(null);
    carregarProdutos();
  }

  async function deletarVenda(id) {
    if (!confirm("Excluir venda?")) return;
    await axios.delete(`${API}/vendas/${id}`);
    carregarVendas();
  }

  async function salvarVenda(v) {
    await axios.put(`${API}/vendas/${v._id}`, v);
    setEditVendaId(null);
    carregarVendas();
  }

  return (
    <div className="flex flex-col gap-4">

      <h2 className="text-xl font-semibold text-gray-900">Gerenciar</h2>

      {/* 🔘 ABAS */}
      <div className="flex gap-2">
        <button
          onClick={() => setAba("produtos")}
          className={`flex-1 p-3 rounded-xl ${
            aba === "produtos" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Produtos
        </button>

        <button
          onClick={() => setAba("vendas")}
          className={`flex-1 p-3 rounded-xl ${
            aba === "vendas" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Vendas
        </button>
      </div>

      {/* 📦 PRODUTOS */}
      {aba === "produtos" && (
        <div className="flex flex-col gap-3">

          {produtos.map((p) => (
            <div key={p._id} className="border p-3 rounded-xl flex flex-col gap-2">

              <input
                className="border p-2 rounded"
                disabled={editProdutoId !== p._id}
                value={p.nome}
                onChange={(e) =>
                  setProdutos(produtos.map(x =>
                    x._id === p._id ? { ...x, nome: e.target.value } : x
                  ))
                }
              />

              <input
                className="border p-2 rounded"
                disabled={editProdutoId !== p._id}
                value={p.categoria}
                onChange={(e) =>
                  setProdutos(produtos.map(x =>
                    x._id === p._id ? { ...x, categoria: e.target.value } : x
                  ))
                }
              />

              <input
                className="border p-2 rounded"
                type="number"
                disabled={editProdutoId !== p._id}
                value={p.valor}
                onChange={(e) =>
                  setProdutos(produtos.map(x =>
                    x._id === p._id ? { ...x, valor: Number(e.target.value) } : x
                  ))
                }
              />

              <input
                className="border p-2 rounded"
                type="number"
                disabled={editProdutoId !== p._id}
                value={p.quantidade}
                onChange={(e) =>
                  setProdutos(produtos.map(x =>
                    x._id === p._id ? { ...x, quantidade: Number(e.target.value) } : x
                  ))
                }
              />

              <div className="flex gap-2">

                {editProdutoId === p._id ? (
                  <button
                    onClick={() => salvarProduto(p)}
                    className="bg-blue-600 text-white p-2 rounded flex-1"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => setEditProdutoId(p._id)}
                    className="bg-yellow-500 text-white p-2 rounded flex-1"
                  >
                    Editar
                  </button>
                )}

                <button
                  onClick={() => deletarProduto(p._id)}
                  className="bg-red-600 text-white p-2 rounded flex-1"
                >
                  Excluir
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* 💰 VENDAS */}
      {aba === "vendas" && (
        <div className="flex flex-col gap-3">

          {vendas.map((v) => (
            <div key={v._id} className="border p-3 rounded-xl">

              <p><b>Cliente:</b> {v.cliente}</p>
              <p><b>Total:</b> R$ {v.valorTotal}</p>
              <p><b>Pagamento:</b> {v.formaPagamento}</p>

              <div className="flex gap-2 mt-2">

                {editVendaId === v._id ? (
                  <button
                    onClick={() => salvarVenda(v)}
                    className="bg-blue-600 text-white p-2 rounded flex-1"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => setEditVendaId(v._id)}
                    className="bg-yellow-500 text-white p-2 rounded flex-1"
                  >
                    Editar
                  </button>
                )}

                <button
                  onClick={() => deletarVenda(v._id)}
                  className="bg-red-600 text-white p-2 rounded flex-1"
                >
                  Excluir
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}