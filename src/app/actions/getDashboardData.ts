'use server';

import { supabase } from '@/lib/supabase';

export interface Convidado {
  id: string;
  nome_principal: string;
  grupo_familia: string[];
  confirmados: Record<string, boolean>;
  data_confirmacao: string | null;
}

export interface DashboardData {
  convidados: Convidado[];
  totalConvidados: number;
  totalConfirmados: number;
  totalNaoConfirmados: number;
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const { data, error } = await supabase
      .from('convidados')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    const convidados: Convidado[] = data || [];

    // Calcular estatísticas
    let totalConfirmados = 0;
    let totalNaoConfirmados = 0;

    convidados.forEach((convidado) => {
      // Total de pessoas no grupo = principal + família
      const todasAsPessoas = [convidado.nome_principal, ...(convidado.grupo_familia || [])];
      const confirmados = convidado.confirmados || {};

      // Contar confirmados e não confirmados
      todasAsPessoas.forEach((pessoa) => {
        if (confirmados[pessoa] === true) {
          totalConfirmados++;
        } else {
          totalNaoConfirmados++;
        }
      });
    });

    return {
      convidados,
      totalConvidados: convidados.length,
      totalConfirmados,
      totalNaoConfirmados,
    };
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    throw err;
  }
}
