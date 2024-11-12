import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.get(`/api/search?query=${query}`);
    setResults(response.data.results);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400 p-8">
      {/* Logo de Mercado Libre */}
      <div className="mb-4">
        <Image
          src="/mercado-libre-logo.png"
          alt="Mercado Libre Logo"
          width={150}
          height={50}
        />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-bold mb-4">Buscar Departamentos</h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Escribe tu búsqueda"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-md border border-gray-300 mb-4 w-72"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Buscar
        </button>
      </form>

      {/* Resultados de la búsqueda */}
      <ul className="mt-8 w-3/4 text-center">
        {results.map((item: any) => (
          <li key={item.id} className="bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-gray-700">
              Precio: {item.price} {item.currency_id}
            </p>
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ver en Mercado Libre
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
