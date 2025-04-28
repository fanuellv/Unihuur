import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

// Tipagem para o formulário de dados de material
interface MaterialFormData {
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
}

// Tipagem para o objeto material que vem da API
interface Material {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
  status: string;
}

export default function Adicionar() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<MaterialFormData>({
    nome: "",
    categoria: "",
    quantidade: 1,
    preco: 0,
  });
  const [materiais, setMateriais] = useState<Material[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/material/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        alert("Material adicionado!");
        setShowModal(false);
        setFormData({ nome: "", categoria: "", quantidade: 1, preco: 0 });
        fetchMateriais(); // Recarregar a lista de materiais após a adição
      } else {
        // Capturando a mensagem de erro da resposta
        const errorData = await res.json();
        alert(`Erro: ${errorData.message}`);
        console.error("Detalhes do erro:", errorData);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de rede. Verifique a conexão.");
    }
  };
  

  const fetchMateriais = async () => {
    try {
      const res = await fetch("/api/material", { method: "GET" });
      const data = await res.json();
      setMateriais(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMateriais(); // Carregar os materiais ao iniciar
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Materiais</h1>
        <button
          className="flex items-center gap-2 text-white bg-amber-500 rounded-2xl px-4 py-2 hover:bg-amber-600 transition"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          <span>Adicionar</span>
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0  backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow">
              <h2 className="text-xl font-bold mb-4">Adicionar Material</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="categoria"
                  placeholder="Categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="quantidade"
                  placeholder="Quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  name="preco"
                  placeholder="Preço"
                  value={formData.preco}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-white rounded"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Preço (Kz)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {materiais.map((material) => (
              <tr key={material.id}>
                <td className="px-6 py-4 whitespace-nowrap">{material.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">{material.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap">{material.quantidade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{material.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{material.preco} Kz</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
