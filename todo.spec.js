const { _electron: electron } = require('playwright');
const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Gerenciamento de Tarefas', () => {
    let electronApp;
    let window;
    // Pega o caminho da aplicação de uma variável de ambiente ou usa um valor padrão
    const appPath = process.env.APP_PATH || 'C:/Caminho/Para/Sua/Aplicacao';
    const uniqueId = Date.now();
    const taskName = `Tarefa Teste ${uniqueId}`;

    test.beforeAll(async () => {
        // Lança a aplicação Electron
        electronApp = await electron.launch({
            executablePath: path.join(appPath, 'node_modules/electron/dist/electron.exe'),
            args: [appPath]
        });
        window = await electronApp.firstWindow();
        await window.waitForLoadState('domcontentloaded');
    });

    test.afterAll(async () => {
        // Fecha a aplicação
        await electronApp.close();
    });

    test('Adiciona uma nova tarefa', async () => {
        // Aguarda o campo de input estar pronto
        const input = window.locator('#item');
        await expect(input).toBeVisible();

        // Clica antes de preencher para garantir o foco
        await input.click();
        // Simula a interação do usuário: preenche e pressiona Enter
        await input.fill(taskName);
        await window.keyboard.press('Enter');

        // Aguarda um pouco e tira um screenshot para ver o estado da tela
        await window.waitForTimeout(1000);
        await window.screenshot({ path: 'success-add.png' });

        // Verifica se a tarefa foi adicionada à lista
        const todoItem = window.getByText(taskName);
        await expect(todoItem).toBeVisible({ timeout: 10000 });
    });

    test('Marca a tarefa como concluída', async () => {
        // Localiza o container da tarefa específica
        const todoContainer = window.locator('li', { hasText: taskName });

        // Localiza o checkbox e clica nele
        const checkbox = todoContainer.locator('input.checkbox');
        await checkbox.click({ force: true });

        await window.screenshot({ path: 'success-complete.png' });

        // Verifica se o container tem a classe 'line-through'
        const taskDiv = todoContainer.locator('div.form-check');
        await expect(taskDiv).toHaveClass(/line-through/, { timeout: 10000 });

        // Verifica se o checkbox está marcado
        await expect(checkbox).toBeChecked();
    });

    test('Remove a tarefa da lista', async () => {
        // Localiza o container da tarefa
        const todoContainer = window.locator('li', { hasText: taskName });

        // Localiza e clica no ícone de remover
        const removeButton = todoContainer.locator('i.remove');
        await removeButton.click();

        await window.screenshot({ path: 'success-remove.png' });

        // Verifica se a tarefa sumiu da lista
        await expect(window.getByText(taskName)).not.toBeVisible({ timeout: 10000 });
    });
});
