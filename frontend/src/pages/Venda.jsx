import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.18.70:3000"; // ⚠️ troca pelo seu IP

export default function Venda() {
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [cliente, setCliente] = useState("");

  const [dataPagamento, setDataPagamento] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("dinheiro");
  const [parcelado, setParcelado] = useState(false);
  const [parcelas, setParcelas] = useState(1);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const res = await axios.get(`${API}/produtos`);
    setProdutos(res.data);
  }

  function adicionarItem() {
    setItens([...itens, { produtoId: "", quantidade: 1 }]);
  }

  function atualizarItem(index, campo, valor) {
    const novos = [...itens];
    novos[index][campo] = valor;
    setItens(novos);
  }

  function calcularTotal() {
    if (!produtos.length) return 0;

    return itens.reduce((total, item) => {
      const produto = produtos.find(p => p._id === item.produtoId);
      if (!produto) return total;
      return total + produto.valor * item.quantidade;
    }, 0);
  }

  async function finalizarVenda() {
    try {
      await axios.post(`${API}/vendas`, {
        cliente,
        dataCompra: new Date(),
        dataPagamento,
        formaPagamento,
        parcelado,
        parcelas,
        itens
      });

      alert("Venda realizada!");

      setItens([]);
      setCliente("");
      setParcelas(1);

    } catch (err) {
      console.error(err);
      alert("Erro ao salvar venda");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      
      <h2 className="text-xl font-semibold text-gray-900">Nova Venda</h2>

      <input
        className="p-3 border rounded-xl"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      {/* 📅 Data pagamento */}
      <input
        type="date"
        className="p-3 border rounded-xl"
        value={dataPagamento}
        onChange={(e) => setDataPagamento(e.target.value)}
      />

      {/* 💳 Forma pagamento */}
      <select
        className="p-3 border rounded-xl"
        value={formaPagamento}
        onChange={(e) => setFormaPagamento(e.target.value)}
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">PIX</option>
        <option value="cartao">Cartão</option>
      </select>

      {/* 📦 Parcelado */}
      <select
        className="p-3 border rounded-xl"
        value={parcelado}
        onChange={(e) => setParcelado(e.target.value === "true")}
      >
        <option value="false">À vista</option>
        <option value="true">Parcelado</option>
      </select>

      {/* 📊 Parcelas */}
      {parcelado && (
        <input
          type="number"
          min="1"
          className="p-3 border rounded-xl"
          value={parcelas}
          onChange={(e) => setParcelas(Number(e.target.value))}
        />
      )}

      <button
        onClick={adicionarItem}
        className="bg-green-600 text-white py-3 rounded-xl"
      >
        + Adicionar Produto
      </button>

      {itens.map((item, index) => (
        <div key={index} className="border p-3 rounded-xl flex flex-col gap-2">
          
          <select
            className="p-2 border rounded"
            onChange={(e) => atualizarItem(index, "produtoId", e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {produtos.map(p => (
              <option key={p._id} value={p._id}>
                {p.nome} (R$ {p.valor})
              </option>
            ))}
          </select>

          <input
            type="number"
            className="p-2 border rounded"
            value={item.quantidade}
            onChange={(e) =>
              atualizarItem(index, "quantidade", Number(e.target.value))
            }
          />
        </div>
      ))}

      <h3 className="text-lg font-bold">
        Total: R$ {calcularTotal()}
      </h3>

      <button
        onClick={finalizarVenda}
        className="bg-blue-600 text-white py-3 rounded-xl"
      >
        Finalizar Venda
      </button>
    </div>
  );
}