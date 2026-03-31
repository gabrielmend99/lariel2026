'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Heart, Check, Phone, MessageCircleCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
        // Usa os confirmados do banco se existirem, senão inicializa como false
        const initialSelected: Record<string, boolean> = result.guest.confirmados || {};
        initialSelected[result.guest.nome_principal] = initialSelected[result.guest.nome_principal] || false;
        result.guest.grupo_familia.forEach((name) => {
          if (!(name in initialSelected)) {
            initialSelected[name] = false;
          }
        });
        setSelectedMembers(initialSelected);
        setTelefone(result.guest.telefone || '');
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

    const digits = telefone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      setError('Informe um telefone válido com DDD (10 ou 11 dígitos).');
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

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setTelefone(formatted);
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
            Confirme sua presença
          </DialogTitle>
          <DialogDescription>
            Celebre este momento inesquecível com a gente!
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
              className="space-y-4 text-blue/50"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue" />
                <input
                  type="text"
                  placeholder="Qual nome está no convite?"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-blue/30 bg-white text-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                  autoFocus
                />
              </div>

              {error && state === 'error' && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleSearch} variant="secondary"
                className="w-full bg-orange text-cream"
              >
                Buscar
              </Button>
            </motion.div>
          )}

          {/* Estado: Loading */}
          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8 gap-3"
            >
              <Loader2 className="h-8 w-8 text-orange animate-spin" />
              <p className="text-orange">Buscando...</p>
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
              <div className="flex flex-col gap-4 border border-blue/30 rounded-xl p-4">
              <div className="text-center text-lg gap-2">
                <p className="text-orange">Olá, {guest.nome_principal}!</p>
                <p className="text-orange text-base mt-1">
                  Quem estará com você no grande dia?
                </p>
              </div>

              <div className="space-y-3">
                {allMembers.map((name) => (
                  <label
                    key={name}
                    className="flex items-center gap-2 p-3 rounded-xl border border-blue/30 hover:bg-blue/10 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedMembers[name] || false}
                      onCheckedChange={() => toggleMember(name)}
                    />
                    <span className="text-blue font-lg">{name}</span>
                  </label>
                ))}
              </div>

              <div className="relative">
                <FaWhatsapp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue" />
                <input
                  type="tel"
                  placeholder="WhatsApp para contato"
                  value={telefone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  className="w-full pl-10 pr-4 py-3 border border-blue/30 rounded-xl text-blue focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleConfirm} variant="secondary"
                className="w-full bg-orange text-cream"
              >
                Confirmar Presença
              </Button>
            </motion.div>          
          )}

          {/* Estado: Confirmando */}
          {state === 'confirming' && (
            <motion.div
              key="confirming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex col items-center justify-center py-8 gap-3"
            >
              <Loader2 className="h-8 w-8 text-orange animate-spin" />
              <p className="text-orange">Confirmando...</p>
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
              <div className="h-16 w-16 bg-orange/10 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-orange" />
              </div>
              <div>
                <p className="text-xl font-serif text-orange">Obrigado!</p>
                <p className="text-orange mt-2">
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