import { useState } from "react";

export default function Login({ setLogado }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (login === "admin" && senha === "5131") {
      setLogado(true);
    } else {
      alert("Login inválido");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Login Administração
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Acesse sua conta
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">

          <input
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            onClick={entrar}
            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-black transition"
          >
            Entrar
          </button>

        </div>

      </div>

    </div>
  );
}