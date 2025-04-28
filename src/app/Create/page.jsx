"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState(""); // Para exibir erros
  const [success, setSuccess] = useState(""); // Para exibir sucesso

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpar o erro anterior
    setSuccess(""); // Limpar a mensagem de sucesso anterior

    // Enviar os dados do formulário para a API de registro
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(data.message); // Exibir mensagem de sucesso
      setForm({ nome: "", email: "", senha: "" }); // Limpar o formulário
    } else {
      setError(data.message || "Erro ao criar conta."); // Exibir erro
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      {/* Mensagem de erro */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mensagem de sucesso */}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <input
          type="text"
          placeholder="Nome completo"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        {/* Senha */}
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        {/* Botão de submit */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}
