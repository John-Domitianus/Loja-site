import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

// 👉 IMPORTA AS TELAS FUTURAS (não quebra se ainda não existirem)
import Produto from "./pages/Produto";
import VerProdutos from "./pages/VerProdutos";
import Venda from "./pages/Venda";
import VerVendas from "./pages/VerVendas";
import Gerenciar from "./pages/Gerenciar";

function App() {
  const [logado, setLogado] = useState(false);
  const [pagina, setPagina] = useState("dashboard");

  if (!logado) {
    return <Login setLogado={setLogado} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* 🧭 Sidebar */}
      <Sidebar setPagina={setPagina} />
      
      {/* 📱 Container estilo app */}
      <div className="w-full max-w-md bg-white min-h-screen p-4 flex flex-col">
        
        {/* 🔀 Rotas */}
        {pagina === "dashboard" && <Dashboard setPagina={setPagina} />}
        {pagina === "produto" && <Produto />}
        {pagina === "verProdutos" && <VerProdutos />}
        {pagina === "venda" && <Venda />}
        {pagina === "verVendas" && <VerVendas />}
        {pagina === "gerenciar" && <Gerenciar />}

        {/* 🔙 Botão voltar (só fora do dashboard) */}
        {pagina !== "dashboard" && (
          <button
            onClick={() => setPagina("dashboard")}
            className="mt-auto w-full bg-gray-900 text-white py-3 rounded-xl"
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}

export default App;