-- ============================================
-- Wedding Site - SQL Schema for Supabase
-- ============================================

-- Tabela de convidados
CREATE TABLE IF NOT EXISTS convidados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_principal TEXT NOT NULL,
  grupo_familia JSONB DEFAULT '[]'::jsonb,
  confirmados JSONB DEFAULT '{}'::jsonb,
  telefone TEXT,
  data_confirmacao TIMESTAMPTZ
);

-- Tabela de presentes
CREATE TABLE IF NOT EXISTS presentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  imagem_url TEXT,
  esgotado BOOLEAN DEFAULT FALSE,
  link_mercado_pago TEXT
);

-- ============================================
-- Dados de exemplo (remover em produção)
-- ============================================

-- Exemplos de convidados
INSERT INTO convidados (nome_principal, grupo_familia) VALUES
  ('João Silva', '["Maria Silva", "Pedro Silva"]'),
  ('Ana Paula', '["Carlos Paula"]'),
  ('Roberto Souza', '["Fernanda Souza", "Lucas Souza", "Julia Souza"]');

-- Exemplos de presentes
INSERT INTO presentes (nome, valor, imagem_url, link_mercado_pago) VALUES
  ('Lua de Mel - Noite 1', 350.00, 'https://exemplo.com/lua1.jpg', 'https://mercadopago.com/checkout/1'),
  ('Lua de Mel - Noite 2', 350.00, 'https://exemplo.com/lua2.jpg', 'https://mercadopago.com/checkout/2'),
  ('Jantar Romântico', 200.00, 'https://exemplo.com/jantar.jpg', 'https://mercadopago.com/checkout/3'),
  ('Kit Praia', 150.00, 'https://exemplo.com/praia.jpg', 'https://mercadopago.com/checkout/4'),
  ('Ingresso Show', 120.00, 'https://exemplo.com/show.jpg', 'https://mercadopago.com/checkout/5');

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE convidados ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentes ENABLE ROW LEVEL SECURITY;

-- Policy: qualquer um pode ler convidados (para busca)
CREATE POLICY "Any can search guests" ON convidados
  FOR SELECT USING (true);

-- Policy: qualquer um pode ler presentes
CREATE POLICY "Any can read gifts" ON presentes
  FOR SELECT USING (true);

-- Policy: qualquer um pode atualizar confirmados (para RSVP)
CREATE POLICY "Any can update confirmation" ON convidados
  FOR UPDATE USING (true);

-- Policy: qualquer um pode ler presentes (para atualizar esgotado)
CREATE POLICY "Any can update gifts" ON presentes
  FOR UPDATE USING (true);