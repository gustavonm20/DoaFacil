# 🎁 DoaFácil — Plataforma de Doações e Adoções

> Uma plataforma web para conectar doadores a pessoas que precisam de itens ou desejam adotar animais de estimação, com foco em solidariedade e impacto local.

[![Python](https://img.shields.io/badge/Python-3-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightblue?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)]()

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#️-modelo-de-dados)
- [Segurança](#-segurança)
- [Contexto Acadêmico](#-contexto-acadêmico)
- [Autor](#-autor)

---

## 🎯 Visão Geral

O **DoaFácil** é uma plataforma web desenvolvida em **Python + Flask**, que conecta **doadores** (pessoas físicas ou instituições) a **adotantes/receptores**, permitindo a publicação de itens ou animais para doação, o gerenciamento de solicitações e um painel administrativo para controle geral da plataforma.

O projeto foi construído com **Flask + SQLAlchemy (ORM)**, seguindo uma separação clara entre modelo de dados (`modelos.py`), lógica de rotas (`app.py`) e camada de apresentação (`templates/`).

---

## ✨ Funcionalidades

### Para Doadores
- Cadastro e login seguro
- Publicação de doações com categoria, subcategoria, fotos e descrição
- Campos específicos para pets (espécie, raça, porte, vacinação, castração, etc.)
- Controle de status: Disponível, Reservado, Doado
- Gerenciamento das solicitações recebidas (aceitar/recusar)

### Para Adotantes
- Busca e filtro de itens por categoria
- Sistema de favoritos
- Envio de solicitação de adoção/recebimento com mensagem e motivo
- Acompanhamento do status das solicitações enviadas

### Para Administradores
- Painel administrativo com visão geral de usuários e doações
- Controle de todos os cadastros da plataforma

### Recursos Gerais
- 🌙 Modo escuro
- 📱 Layout responsivo
- 🔒 Senhas protegidas com hashing (Werkzeug)
- 🗄️ Persistência de dados via SQLAlchemy + SQLite

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| **Backend** | Python 3 + Flask |
| **Banco de Dados** | SQLite + Flask-SQLAlchemy |
| **Autenticação** | Flask-Login + Werkzeug (hash de senha) |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Upload de imagens** | Pillow |

---

## 📦 Instalação

### Pré-requisitos
- Python 3.x instalado

### Windows (automático)
Basta executar o arquivo `INICIAR_SITE.bat` — ele cria o ambiente virtual, instala as dependências e inicia o servidor automaticamente.

### Linux / macOS / manual no Windows

```bash
git clone https://github.com/gustavonm20/DoaFacil.git
cd DoaFacil/doafacil_web

python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
python app.py
```

O banco de dados (`instance/doafacil.db`) é criado automaticamente na primeira execução, já populado com categorias, pets e itens de exemplo.

Acesse depois em:
```
http://127.0.0.1:5000
```

---

## 🚀 Como Usar

### Contas de demonstração

| Perfil | Email | Senha |
|---|---|---|
| Doador | `doador@doafacil.com` | `123456` |
| Adotante | `adotante@email.com` | `123456` |
| Administrador | `admin@doafacil.com` | `admin123` |

### Fluxo básico
1. Crie uma conta (ou use uma conta demo) escolhendo o perfil Doador ou Adotante
2. Doadores publicam itens/pets disponíveis para doação
3. Adotantes navegam, favoritam e enviam solicitação
4. Doador aceita ou recusa a solicitação recebida
5. Status da doação é atualizado automaticamente

---

## 📁 Estrutura do Projeto

```
doafacil_web/
│
├── app.py                     # Rotas Flask e lógica principal
├── modelos.py                 # Modelos SQLAlchemy (Usuario, Doacao, Categoria, etc.)
├── banco.py                   # Inicialização e seed do banco de dados
├── requirements.txt           # Dependências do projeto
├── INICIAR_SITE.bat           # Script de inicialização automática (Windows)
│
├── templates/                 # Views (Jinja2)
│   ├── base.html
│   ├── index.html
│   ├── login.html / cadastro.html
│   ├── painel_doador.html / painel_adotante.html / painel_admin.html
│   ├── nova_doacao.html / editar_doacao.html / detalhes_doacao.html
│   ├── categoria.html / categorias.html
│   ├── favoritos.html / minhas_solicitacoes.html / solicitar_doacao.html
│   └── sobre.html / como_funciona.html / privacidade.html / 404.html
│
├── static/
│   ├── css/style.css
│   └── js/app.js
│
└── instance/                  # Banco SQLite (gerado automaticamente, fora do controle de versão)
```

---

## 🗃️ Modelo de Dados

Principais entidades (definidas em `modelos.py`, via SQLAlchemy ORM):

- **Usuario** — dados de conta, perfil (Doador / Adotante / Admin)
- **Categoria** e **Subcategoria** — organização hierárquica dos itens
- **Doacao** — item ou pet publicado, com status e vínculo ao doador
- **PetDetalhes** — dados específicos de animais (relação 1:1 com Doacao)
- **Favorito** — relação N:N entre usuários e doações
- **Solicitacao** — pedido de adoção/recebimento, com status (Pendente/Aceito/Recusado)

Os relacionamentos usam chaves estrangeiras e cascades (ex: apagar uma doação remove suas solicitações e favoritos associados).

---

## 🔒 Segurança

- Senhas armazenadas com hash via `werkzeug.security` (nunca em texto puro)
- Controle de sessão com Flask-Login (`@login_required` nas rotas protegidas)
- Prevenção de SQL Injection nativa do SQLAlchemy (queries parametrizadas)
- Caminhos absolutos para banco e uploads, evitando erros de path relativo

---

## 🎓 Contexto Acadêmico

Projeto desenvolvido como trabalho do curso de **Análise e Desenvolvimento de Sistemas (ADS)**, aplicando:
- Modelagem de dados relacional com SQLAlchemy
- Perfis de usuário com diferentes níveis de permissão
- Arquitetura Flask (rotas, modelos e templates)
- Boas práticas de segurança no tratamento de senhas e sessões

---

## 👨‍💻 Autor

**Gustavo** — [@gustavonm20](https://github.com/gustavonm20)
