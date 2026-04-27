export default function Sidebar({ setPagina }) {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">

      <h1 className="text-xl font-bold mb-6">Sistema</h1>

      <nav className="flex flex-col gap-2">

        <button onClick={() => setPagina("dashboard")} className="p-2 rounded hover:bg-gray-700 text-left">
          Resumo de Vendas
        </button>

        <button onClick={() => setPagina("venda")} className="p-2 rounded hover:bg-gray-700 text-left">
          Nova Venda
        </button>

        <button onClick={() => setPagina("verVendas")} className="p-2 rounded hover:bg-gray-700 text-left">
          Ver Vendas
        </button>

        <button onClick={() => setPagina("produto")} className="p-2 rounded hover:bg-gray-700 text-left">
          Novo Produto
        </button>

        <button onClick={() => setPagina("verProdutos")} className="p-2 rounded hover:bg-gray-700 text-left">
          Ver Estoque
        </button>

        <button onClick={() => setPagina("gerenciar")} className="p-2 rounded hover:bg-gray-700 text-left">
          Gerenciar
        </button>

      </nav>

    </aside>
  );
}