'use client';

import { useState } from 'react';
import { searchGuest, type Guest } from '@/app/actions/searchGuest';

export function GuestSearch() {
  const [searchName, setSearchName] = useState('');
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchName.trim()) {
      setError('Por favor, digite um nome para buscar.');
      return;
    }

    setLoading(true);
    setError(null);
    setGuest(null);

    try {
      const result = await searchGuest(searchName);

      if (result.error) {
        setError(result.error);
      } else if (result.guest) {
        setGuest(result.guest);

        // Log no console conforme solicitado
        console.log('=== CONVIDADO ENCONTRADO ===');
        console.log('Nome Principal:', result.guest.nome_principal);
        console.log('Grupo Familiar:', result.guest.grupo_familia);
        console.log('Dependentes:', result.guest.grupo_familia.length);
        console.log('===========================');
      }
    } catch (err) {
      setError('Erro ao buscar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-serif text-center mb-6">
        Confirme sua presença
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {guest && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            Olá, {guest.nome_principal}!
          </h3>

          {guest.grupo_familia.length > 0 ? (
            <div>
              <p className="text-green-700 mb-2">
                Grupo familiar encontrado ({guest.grupo_familia.length} dependentes):
              </p>
              <ul className="list-disc list-inside text-green-700">
                {guest.grupo_familia.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-green-700">
              Você confirmou: {guest.confirmados[guest.nome_principal] ? 'Sim' : 'Não'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}