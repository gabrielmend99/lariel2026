'use client';

import { Convidado } from '@/app/actions/getDashboardData';

interface GuestListProps {
  convidados: Convidado[];
}

export function GuestList({ convidados }: GuestListProps) {
  const getStatusDisplay = (confirmed: boolean | undefined) => {
    if (confirmed === true) {
      return { text: 'Confirmado', color: 'text-blue', bgColor: 'bg-blue bg-opacity-10', icon: '✓' };
    }
    return { text: 'Não confirmado', color: 'text-purple', bgColor: 'bg-purple bg-opacity-10', icon: '○' };
  };

  return (
    <div className="space-y-4">
      {convidados.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="font-syne">Nenhum convidado encontrado</p>
        </div>
      ) : (
        convidados
          .map((convidado) => {
            const nomePrincipal = convidado.nome_principal;
            const principalConfirmado = (convidado.confirmados || {})[nomePrincipal] === true;
            return { convidado, principalConfirmado };
          })
          .sort((a, b) => {
            // Confirmados primeiro
            if (a.principalConfirmado && !b.principalConfirmado) return -1;
            if (!a.principalConfirmado && b.principalConfirmado) return 1;
            return 0;
          })
          .map(({ convidado }) => {
            const nomePrincipal = convidado.nome_principal;
            const familia = convidado.grupo_familia || [];
            const confirmados = convidado.confirmados || {};

            // Ordenar família: confirmados primeiro, depois não confirmados
            const familiaOrdenada = [
              ...familia.filter(m => confirmados[m] === true),
              ...familia.filter(m => confirmados[m] !== true)
            ];

          return (
            <div key={convidado.id} className="bg-white rounded-lg p-6 border border-gray-100">
              {/* Nome do Convite */}
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-syne font-bold text-gray-900">
                  {nomePrincipal}
                </h3>
              </div>

              {/* Membros da Família */}
              <div className="space-y-3">
                {/* Convidado Principal */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700 font-syne">{nomePrincipal}</span>
                  {(() => {
                    const status = getStatusDisplay(confirmados[nomePrincipal]);
                    return (
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-syne font-semibold px-3 py-1 rounded-full ${status.bgColor} ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                {/* Acompanhantes */}
                {familia.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {familiaOrdenada.map((membro, index) => {
                      const status = getStatusDisplay(confirmados[membro]);
                      return (
                        <div key={index} className="flex items-center justify-between py-2 text-gray-600">
                          <span className="text-gray-600 font-syne text-sm">
                            + {membro}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-syne font-semibold px-3 py-1 rounded-full ${status.bgColor} ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
          })
        )}
    </div>
  );
}
