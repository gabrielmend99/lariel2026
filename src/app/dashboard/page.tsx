'use client';

import { useState, useEffect } from 'react';
import { getDashboardData, DashboardData } from '@/app/actions/getDashboardData';
import { PasswordPrompt } from './components/PasswordPrompt';
import { GuestList } from './components/GuestList';
import Link from 'next/link';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !data) {
      fetchData();
    }
  }, [isAuthenticated, data]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <PasswordPrompt onSuccess={() => setIsAuthenticated(true)} />;
  }

  const confirmationRate = data
    ? Math.round((data.totalConfirmados / (data.totalConfirmados + data.totalNaoConfirmados)) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-syne font-bold text-gray-900 mb-2">Confirmações</h1>
            <p className="text-gray-600 font-syne text-sm">Acompanhamento em tempo real</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-syne font-semibold text-sm transition-colors"
          >
            ← Voltar
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-700 font-syne">Carregando dados...</p>
          </div>
        ) : data ? (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="flex gap-6 flex-wrap">
              <div>
                <p className="text-sm text-gray-600 font-syne mb-1">Total de convidados</p>
                <p className="text-3xl font-syne font-bold text-gray-900">{data.totalConvidados}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-syne mb-1">Confirmados</p>
                <p className="text-3xl font-syne font-bold text-blue">{data.totalConfirmados}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-syne mb-1">Não confirmados</p>
                <p className="text-3xl font-syne font-bold text-purple">{data.totalNaoConfirmados}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-syne mb-1">Taxa</p>
                <p className="text-3xl font-syne font-bold text-orange">{confirmationRate}%</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200"></div>

            {/* Guest List */}
            <div>
              <GuestList convidados={data.convidados} />
            </div>

            {/* Refresh Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={fetchData}
                disabled={isLoading}
                className="px-6 py-2 text-sm font-syne font-semibold text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                ↻ Atualizar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-700 font-syne">Erro ao carregar dados</p>
          </div>
        )}
      </div>
    </main>
  );
}
