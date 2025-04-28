import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import jwt from "jsonwebtoken"; // Importando a lib jwt

interface MaterialFormData {
  titulo: string;
  descricao: string;
  categoria: string;
  precoAluguel: number;
  userId: number;
}

interface Material {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  precoAluguel: number;
  status: string;
  userId: number; // <-- adiciona isso aqui
}

interface JwtPayload {
  userId: number;
}


export default function Adicionar() {
  const [showModal, setShowModal] = useState(false);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<MaterialFormData>({
    titulo: "",
    descricao: "",
    categoria: "",
    precoAluguel: 0,
    userId: 0, // Inicializando como 0, mas vai ser preenchido com o userId do token
  });

  // Função para capturar o userId do token JWT
  // Função para capturar o userId do token JWT
const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt.decode(token) as JwtPayload | null;
    return decodedToken?.userId || null; // Retorna o userId se encontrado
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return null;
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setFormData({
          titulo: "",
          descricao: "",
          categoria: "",
          precoAluguel: 0,
          userId: getUserIdFromToken() || 0, // Garantindo que o userId seja recuperado corretamente
        });        
        fetchMateriais(); // Recarrega a lista de materiais
      } else {
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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Erro: Token não fornecido.");
        alert("Erro: Token não fornecido.");
        setMateriais([]);
        return;
      }
  
      const userId = getUserIdFromToken(); // Chamando a função de forma segura
      if (!userId) {
        console.error("Erro: userId não encontrado no token.");
        setMateriais([]);
        return;
      }
  
      const res = await fetch("/api/material/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      if (Array.isArray(data)) {
        // Filtrando materiais pelo userId
        const materiaisDoUsuario = data.filter((material: Material) => material.userId === userId);
        setMateriais(materiaisDoUsuario);
        setErrorMessage(""); // Limpa a mensagem de erro, se existir
      } else {
        console.error("Erro ao buscar materiais:", data);
        setErrorMessage(data.message || "Erro desconhecido. Tente novamente mais tarde.");
        setMateriais([]);
      }
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
      setErrorMessage("Erro de rede. Tente novamente mais tarde.");
      setMateriais([]);
    }
  };
  

  // Carrega o userId do token quando o componente for montado
  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setFormData((prev) => ({ ...prev, userId }));
    }
    fetchMateriais(); // Carrega os materiais após a montagem
  }, []); // Só executa uma vez quando o componente for montado

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
      </div>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow">
            <h2 className="text-xl font-bold mb-4">Adicionar Material</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <textarea
                name="descricao"
                placeholder="Descrição"
                value={formData.descricao}
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
                step="0.01"
                name="precoAluguel"
                placeholder="Preço de Aluguel"
                value={formData.precoAluguel}
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Preço de Aluguel (Kz)
              </th>
            </tr>
          </thead>
          <tbody>
            {materiais.map((material) => (
              <tr key={material.id}>
                <td className="px-6 py-4">{material.titulo}</td>
                <td className="px-6 py-4">{material.descricao}</td>
                <td className="px-6 py-4">{material.categoria}</td>
                <td className="px-6 py-4">{material.status}</td>
                <td className="px-6 py-4">{material.precoAluguel} Kz</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
