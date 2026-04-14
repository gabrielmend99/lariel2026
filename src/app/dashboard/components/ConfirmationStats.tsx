'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ConfirmationStatsProps {
  totalConfirmados: number;
  totalNaoConfirmados: number;
}

export function ConfirmationStats({
  totalConfirmados,
  totalNaoConfirmados,
}: ConfirmationStatsProps) {
  const total = totalConfirmados + totalNaoConfirmados;
  const percentage = total > 0 ? Math.round((totalConfirmados / total) * 100) : 0;

  const data = [
    { name: 'Confirmados', value: totalConfirmados, color: '#7cbefa' },
    { name: 'Não Confirmados', value: totalNaoConfirmados, color: '#E8C4DC' },
  ];

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="font-syne font-bold text-lg mb-4">Taxa de Confirmação</h3>
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue to-orange h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && (
                <span className="text-white font-syne font-semibold text-sm">{percentage}%</span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {totalConfirmados} de {total} confirmados
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="font-syne font-bold text-lg mb-4">Distribuição de Confirmações</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
