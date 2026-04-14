'use client';

import { useState } from 'react';

interface PasswordPromptProps {
  onSuccess: () => void;
}

export function PasswordPrompt({ onSuccess }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Senha simples - você pode mudar para uma variável de ambiente
    const correctPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'noivos2026';

    if (password === correctPassword) {
      setPassword('');
      onSuccess();
    } else {
      setError('Senha incorreta');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-md w-full border border-gray-100">
        <h1 className="text-3xl text-orange font-syne font-bold text-center mb-2">Dashboard</h1>
        <p className="text-center text-gray-600 font-syne text-sm mb-6">Área protegida</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-syne font-semibold mb-2 text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange transition-colors font-syne text-sm"
              disabled={isLoading}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2 font-syne">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange hover:bg-opacity-90 text-white font-syne font-semibold py-2 rounded-md transition-all disabled:opacity-50"
          >
            {isLoading ? 'Verificando...' : 'Acessar'}
          </button>
        </form>
      </div>
    </div>
  );
}
