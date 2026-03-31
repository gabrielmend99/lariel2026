'use server';

import { supabase } from '@/lib/supabase';

export interface Guest {
  id: string;
  nome_principal: string;
  grupo_familia: string[];
  confirmados: Record<string, boolean>;
  telefone: string | null;
  data_confirmacao: string | null;
}

export interface GuestSearchResult {
  guest: Guest | null;
  error: string | null;
}

/**
 * Busca um convidado pelo nome usando ilike (case-insensitive)
 * @param name - Nome a ser buscado
 * @returns Dados do convidado e grupo familiar ou erro
 */
export async function searchGuest(name: string): Promise<GuestSearchResult> {
  if (!name || name.trim().length === 0) {
    return { guest: null, error: 'Por favor, digite um nome para buscar.' };
  }

  try {
    const { data, error } = await supabase
      .from('convidados')
      .select('*')
      .ilike('nome_principal', name.trim())
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { guest: null, error: 'Erro ao buscar convidado. Tente novamente.' };
    }

    if (!data) {
      return {
        guest: null,
        error: 'Nome não encontrado. Por favor, verifique a grafia ou entre em contato com os noivos.',
      };
    }

    return {
      guest: {
        id: data.id,
        nome_principal: data.nome_principal,
        grupo_familia: data.grupo_familia || [],
        confirmados: data.confirmados || {},
        telefone: data.telefone,
        data_confirmacao: data.data_confirmacao,
      },
      error: null,
    };
  } catch (err) {
    console.error('Search error:', err);
    return { guest: null, error: 'Erro inesperado. Tente novamente.' };
  }
}