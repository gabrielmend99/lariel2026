'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Heart, Check, Phone } from 'lucide-react';
import { searchGuest, type Guest } from '@/app/actions/searchGuest';
import { confirmRsvp } from '@/app/actions/confirmRsvp';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/Button';

type RSVPState = 'search' | 'loading' | 'found' | 'confirming' | 'success' | 'error';

interface RSVPModalProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function RSVPModal({ variant = 'primary', className = '' }: RSVPModalProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<RSVPState>('search');
  const [searchName, setSearchName] = useState('');
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Record<string, boolean>>({});
  const [telefone, setTelefone] = useState('');

  const resetForm = () => {
    setState('search');
    setSearchName('');
    setGuest(null);
    setError(null);
    setSelectedMembers({});
    setTelefone('');
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(resetForm, 300);
    }
  };

  const handleSearch = async () => {
    if (!searchName.trim()) {
      setError('Por favor, digite um nome para buscar.');
      return;
    }

    setState('loading');
    setError(null);

    try {
      const result = await searchGuest(searchName);

      if (result.error) {
        setError(result.error);
        setState('error');
      } else if (result.guest) {
        setGuest(result.guest);
        // Inicializa todos os membros como false (não confirmou)
        const initialSelected: Record<string, boolean> = {};
        initialSelected[result.guest.nome_principal] = false;
        result.guest.grupo_familia.forEach((name) => {
          initialSelected[name] = false;
        });
        setSelectedMembers(initialSelected);
        setState('found');
      }
    } catch (err) {
      setError('Erro ao buscar. Tente novamente.');
      setState('error');
    }
  };

  const handleConfirm = async () => {
    if (!guest) return;

    // Valida se pelo menos uma pessoa confirmou
    const hasConfirmation = Object.values(selectedMembers).some((v) => v);
    if (!hasConfirmation) {
      setError('Selecione pelo menos uma pessoa que confirmou presença.');
      return;
    }

    if (!telefone.trim()) {
      setError('Por favor, informe um telefone para contato.');
      return;
    }

    setState('confirming');

    try {
      const result = await confirmRsvp(guest.id, selectedMembers, telefone);

      if (result.success) {
        setState('success');
        // Fecha o modal após 3 segundos
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      } else {
        setError(result.error || 'Erro ao confirmar.');
        setState('found');
      }
    } catch (err) {
      setError('Erro ao confirmar. Tente novamente.');
      setState('found');
    }
  };

  const toggleMember = (name: string) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    setError(null);
  };

  // Gets all member names for rendering
  const allMembers = guest
    ? [guest.nome_principal, ...guest.grupo_familia]
    : [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          Confirmar presença
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            Confirme sua Presença
          </DialogTitle>
          <DialogDescription>
            Celebre conosco este momento especial
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Estado: Busca */}
          {(state === 'search' || state === 'error') && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Digite seu nome conforme o convite"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>

              {error && state === 'error' && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleSearch}
                className="w-full py-3 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-colors"
              >
                Buscar
              </button>
            </motion.div>
          )}

          {/* Estado: Loading */}
          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 gap-3"
            >
              <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
              <p className="text-gray-500">Buscando...</p>
            </motion.div>
          )}

          {/* Estado: Encontrado */}
          {state === 'found' && guest && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-rose-50 rounded-xl p-4 text-center">
                <p className="text-rose-800 font-medium">Olá, {guest.nome_principal}!</p>
                <p className="text-rose-600 text-sm mt-1">
                  Quem confirmou presença?
                </p>
              </div>

              <div className="space-y-3">
                {allMembers.map((name) => (
                  <label
                    key={name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedMembers[name] || false}
                      onCheckedChange={() => toggleMember(name)}
                    />
                    <span className="text-gray-700 font-medium">{name}</span>
                  </label>
                ))}
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Telefone para contato"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleConfirm}
                className="w-full py-3 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="h-5 w-5 fill-white" />
                Confirmar Presença
              </button>
            </motion.div>
          )}

          {/* Estado: Confirmando */}
          {state === 'confirming' && (
            <motion.div
              key="confirming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 gap-3"
            >
              <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
              <p className="text-gray-500">Confirmando...</p>
            </motion.div>
          )}

          {/* Estado: Sucesso */}
          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 gap-4 text-center"
            >
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-rose-500" />
              </div>
              <div>
                <p className="text-xl font-serif text-gray-800">Obrigado!</p>
                <p className="text-gray-500 mt-2">
                  Sua presença significa muito para nós.
                  <br />
                  Nos vemos no grande dia!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}