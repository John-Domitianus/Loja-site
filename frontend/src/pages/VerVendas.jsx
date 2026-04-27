import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.18.70:3000";

export default function VerVendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await axios.get(`${API}/vendas`);
      setVendas(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar vendas");
    }
  }

  function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleString();
  }

  return (
    <div className="flex flex-col gap-4">
      
      <h2 className="text-xl font-semibold text-gray-900">Histórico de Vendas</h2>

      {vendas.length === 0 && (
        <p>Nenhuma venda registrada</p>
      )}

      {vendas.map((venda) => (
        <div key={venda._id} className="border rounded-xl p-4 shadow-sm bg-white">
          
          <div><b>Cliente:</b> {venda.cliente || "Não informado"}</div>

          <div><b>Data:</b> {formatarData(venda.dataCompra)}</div>

          <div><b>Pagamento:</b> {venda.formaPagamento}</div>

          <div>
            <b>Parcelado:</b> {venda.parcelado ? "Sim" : "Não"}
          </div>

          {venda.parcelado && (
            <div><b>Parcelas:</b> {venda.parcelas}</div>
          )}

          <div className="font-semibold mt-2">
            Total: R$ {venda.valorTotal}
          </div>

          <div className="mt-2">
            <b>Itens:</b>
            {venda.itens.map((item, i) => (
              <div key={i} className="text-sm ml-2">
                - {item.nome} | Qtd: {item.quantidade} | R$ {item.subtotal}
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}