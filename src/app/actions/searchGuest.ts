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
 * Remove acentos e til do texto
 * @param str - Texto a ser normalizado
 * @returns Texto sem acentos
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca um convidado pelo nome ignorando acentos e case-sensitive
 * @param name - Nome a ser buscado
 * @returns Dados do convidado e grupo familiar ou erro
 */
export async function searchGuest(name: string): Promise<GuestSearchResult> {
  if (!name || name.trim().length === 0) {
    return { guest: null, error: 'Por favor, digite um nome para buscar.' };
  }

  try {
    const normalizedSearchName = removeAccents(name.trim().toLowerCase());
    
    // Busca todos os convidados e filtra localmente para ignorar acentos
    const { data, error } = await supabase
      .from('convidados')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return { guest: null, error: 'Convidado não encontrado. Digite o nome exatamente como está no convite.' };
    }

    if (!data || data.length === 0) {
      return {
        guest: null,
        error: 'Nenhum convidado encontrado no banco de dados.',
      };
    }

    // Filtra localmente comparando nomes normalizados
    const foundData = data.find(
      (guest) => removeAccents(guest.nome_principal.toLowerCase()) === normalizedSearchName
    );

    if (!foundData) {
      return {
        guest: null,
        error: 'Convidado não encontrado. Digite o nome exatamente como está no convite.',
      };
    }

    return {
      guest: {
        id: foundData.id,
        nome_principal: foundData.nome_principal,
        grupo_familia: foundData.grupo_familia || [],
        confirmados: foundData.confirmados || {},
        telefone: foundData.telefone,
        data_confirmacao: foundData.data_confirmacao,
      },
      error: null,
    };
  } catch (err) {
    console.error('Search error:', err);
    return { guest: null, error: 'Erro inesperado. Tente novamente.' };
  }
}