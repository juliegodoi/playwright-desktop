# Automação de Testes Desktop: Playwright + Electron

Este repositório contém um projeto de automação de testes para aplicações desktop utilizando **Playwright**. O foco é validar as funcionalidades principais de uma aplicação de lista de tarefas (To-Do List) desenvolvida em **Electron**.

## 🚀 Sobre o Projeto

O Playwright permite a automação de navegadores web e também de aplicações desktop baseadas em Electron. Diferente de testes web tradicionais, aqui interagimos diretamente com a janela do aplicativo Electron, simulando ações reais do usuário como digitar, clicar em checkboxes e remover itens.

### Funcionalidades Testadas:
1.  **Criação de Tarefa**: Valida se uma nova tarefa é adicionada corretamente à lista após o input.
2.  **Marcação de Conclusão**: Valida se, ao clicar no checkbox, a tarefa recebe o estilo visual de concluída.
3.  **Exclusão de Tarefa**: Valida se a tarefa é removida da interface após o clique no ícone de exclusão.

---

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão LTS recomendada).
*   [Git](https://git-scm.com/).

---

## 📦 Configuração do Ambiente

Para rodar este projeto, você precisará de duas partes: a aplicação alvo e este projeto de testes.

### 1. Preparar a Aplicação (Target App)
A aplicação testada é o [Electron TodoList App](https://github.com/iammuhammadasimofficial/electron-todolist-app).

```bash
# Clone a aplicação
git clone https://github.com/iammuhammadasimofficial/electron-todolist-app.git

# Acesse a pasta
cd electron-todolist-app

# Instale as dependências
npm install
```

### 2. Preparar os Testes
Nesta pasta de testes (`playwright-desktop`):

```bash
# Instale as dependências do Playwright
npm install
```

---

## 🏃 Como Rodar os Testes

Com as dependências instaladas, execute o comando abaixo:

```bash
npx playwright test todo.spec.js
```

Se desejar ver o log detalhado no terminal:
```bash
npx playwright test todo.spec.js --reporter=list
```

---

## 🔍 Como o Código Funciona

O arquivo `todo.spec.js` utiliza a biblioteca oficial do Playwright para Electron.

### Lógica Principal:
*   **Ciclo de Vida**: No bloco `beforeAll`, o Playwright localiza o executável do Electron e lança o app. No `afterAll`, ele encerra o processo.
*   **Locators**: Utilizamos seletores de ID (`#item`) e busca por texto (`getByText`).
*   **Interação com Elementos Customizados**: Como a aplicação possui elementos de UI que sobrepõem o checkbox original, usamos o modo `{ force: true }` para garantir que o clique seja registrado.
*   **Evidências**: São gerados três arquivos de imagem em caso de sucesso: `success-add.png`, `success-complete.png` e `success-remove.png`.

### 📸 Evidências de Sucesso
Após a execução dos testes, você encontrará as seguintes imagens na raiz do projeto:

| Adição de Tarefa | Marcação de Conclusão | Exclusão de Tarefa |
| :---: | :---: | :---: |
| <img width="300" alt="Adição de Tarefa" src="https://github.com/user-attachments/assets/e340e414-1601-41fd-bb0d-ebace41aa8a0" /> | <img width="300" alt="Marcação de Conclusão" src="https://github.com/user-attachments/assets/5252ef59-4a57-41a1-a8a2-ff9797c27db2" /> | <img width="300" alt="Exclusão de Tarefa" src="https://github.com/user-attachments/assets/4b29f684-5f6b-4585-962b-f684f806ee7c" /> |


---

## ⚙️ Configuração do Caminho da Aplicação

Para que os testes funcionem, o Playwright precisa saber onde a aplicação Electron está instalada no seu computador. 

Você pode configurar isso de duas formas:

1.  **Variável de Ambiente**:
    No terminal, antes de rodar os testes, defina a variável `APP_PATH`:
    ```bash
    # No PowerShell
    $env:APP_PATH="C:/Caminho/Para/electron-todolist-app"
    npx playwright test
    ```

2.  **Edição Direta**:
    Abra o arquivo `todo.spec.js` e altere a variável `appPath` na linha 8 para o caminho absoluto da pasta onde você clonou a aplicação.

---

## 🎁 Créditos

A aplicação utilizada como alvo desses testes foi desenvolvida por **iammuhammadasimofficial**. 
Você pode encontrar o repositório original aqui: [electron-todolist-app](https://github.com/iammuhammadasimofficial/electron-todolist-app).



