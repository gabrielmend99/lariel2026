'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const PIX_CODE = '00020126360014br.gov.bcb.pix0114+55199714080635204000053039865802BR5922GABRIELHENRIQUEPESSOAL6009Sao Paulo610901227-20062230519daqr2959972245265226304108D';

export function PixCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Tenta usar a API moderna primeiro
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PIX_CODE);
      } else {
        // Fallback para mobile/não seguros
        const textArea = document.createElement('textarea');
        textArea.value = PIX_CODE;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="inline-flex">
      <Button className="bg-orange" variant="secondary" onClick={handleCopy}>
        {copied ? 'Código PIX copiado' : 'Copiar chave PIX'}
      </Button>
    </div>
  );
}