import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const API = "http://192.168.18.70:3000";

export default function Dashboard() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const res = await axios.get(`${API}/vendas`);
      setVendas(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // KPIs
  const total = vendas.reduce((acc, v) => acc + (v.valorTotal || 0), 0);
  const qtd = vendas.length;
  const media = qtd > 0 ? total / qtd : 0;

  // Agrupar por data
  const vendasPorDia = {};

  vendas.forEach(v => {
    const data = new Date(v.dataCompra).toLocaleDateString();
    vendasPorDia[data] = (vendasPorDia[data] || 0) + (v.valorTotal || 0);
  });

  const grafico = Object.keys(vendasPorDia).map(data => ({
    data,
    total: vendasPorDia[data]
  }));

  return (
    <div className="flex flex-col gap-6 text-gray-900">

      {/* TÍTULO PRINCIPAL */}
      <h1 className="text-3xl font-bold text-gray-900">
        Dashboard
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Total vendido</p>
          <h2 className="text-2xl font-bold text-green-600">
            R$ {total.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Vendas</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {qtd}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Média</p>
          <h2 className="text-2xl font-bold text-purple-600">
            R$ {media.toFixed(2)}
          </h2>
        </div>

      </div>

      {/* GRÁFICO */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-900 mb-3">
          Vendas por dia
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={grafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ÚLTIMAS VENDAS */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-900 mb-3">
          Últimas vendas
        </h2>

        <div className="flex flex-col gap-2 text-gray-800">
          {vendas.slice(-5).reverse().map(v => (
            <div
              key={v._id}
              className="flex justify-between border-b pb-2 border-gray-200"
            >
              <span>{v.cliente || "Sem nome"}</span>
              <span className="font-semibold text-gray-900">
                R$ {(v.valorTotal || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}