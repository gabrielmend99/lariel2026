'use server';

import { supabase } from '@/lib/supabase';

export interface ConfirmRsvpResult {
  success: boolean;
  error: string | null;
}

/**
 * Confirma a presença de convidados
 * @param guestId - ID do convidado principal
 * @param confirmados - Objeto com nomes e status de confirmação
 */
export async function confirmRsvp(
  guestId: string,
  confirmados: Record<string, boolean>
): Promise<ConfirmRsvpResult> {
  try {
    const { error } = await supabase
      .from('convidados')
      .update({
        confirmados,
        data_confirmacao: new Date().toISOString(),
      })
      .eq('id', guestId);

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: 'Erro ao confirmar. Tente novamente.' };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Confirm error:', err);
    return { success: false, error: 'Erro inesperado. Tente novamente.' };
  }
}