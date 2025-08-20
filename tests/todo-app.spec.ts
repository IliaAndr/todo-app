import { expect, test } from '@playwright/test'
import { TodoPage } from './pages/todo-page'
import { SERVICE_URL } from '../config/env-data'
import { faker } from '@faker-js/faker'

test.describe('TodoMVC', () => {
  let todoPage: TodoPage
  let task1: string
  let task2: string

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)
    await page.goto(SERVICE_URL)
    task1 = faker.lorem.words(2)
    task2 = faker.lorem.words(3)
    await todoPage.addTodo(task1)
    await todoPage.addTodo(task2)
    expect.soft(await todoPage.todoItems.count()).toBe(2)
    await expect.soft(todoPage.todoCount).toHaveText('2 items left!')
  })
  test('successful creation of two tasks', async () => {
    const firstTodoText = await todoPage.getTodoTextByIndex(0)
    const secondTodoText = await todoPage.getTodoTextByIndex(1)
    expect.soft(firstTodoText).toBe(task1)
    expect.soft(secondTodoText).toBe(task2)
  })

  test('delete a task by name', async () => {
    const secondTodoText = await todoPage.getTodoTextByIndex(1)
    await todoPage.deleteTodoByName(task1)
    expect.soft(secondTodoText).toBe(task2)
    expect.soft(await todoPage.getTodoTextByIndex(0)).toBe(task2)
    expect.soft(await todoPage.todoCount.textContent()).toContain('1 item left!')
  })

  test('activate a task by name', async () => {
    await todoPage.completeTodoByName(task1)
    expect.soft(await todoPage.todoCount.textContent()).toContain('1 item left!')
    const firstTodo = todoPage.todoItems.nth(0)
    expect.soft(firstTodo).toHaveClass(/completed/)
    const firstTodoText = await todoPage.getTodoTextByIndex(0)
    expect.soft(firstTodoText).toBe(task1)
  })

  test('checking that button "active" and button "completed" are working correctly', async () => {
    await todoPage.completeTodoByName(task1)

    await todoPage.filterActive.click()
    const activeTodos = todoPage.todoItems.filter({ hasText: task2 })
    const activeLabel = activeTodos.locator('[data-testid="todo-item-label"]')
    expect.soft(await activeTodos.count()).toBe(1)
    await expect.soft(activeLabel).toHaveText(task2)
    await expect.soft(todoPage.todoCount).toHaveText('1 item left!')

    await todoPage.filterCompleted.click()
    const completedTodos = todoPage.todoItems.filter({ hasText: task1 })
    const completedLabel = completedTodos.locator('[data-testid="todo-item-label"]')
    expect.soft(await completedTodos.count()).toBe(1)
    await expect.soft(completedLabel).toHaveText(task1)
    await expect.soft(todoPage.todoCount).toHaveText('1 item left!')
  })

  test('checking that button "clear completed" is working correctly', async () => {
    await todoPage.completeTodoByName(task1)

    await todoPage.filterCompleted.click()
    const completedTodos = todoPage.todoItems.filter({ hasText: task1 })
    const completedLabel = completedTodos.locator('[data-testid="todo-item-label"]')
    expect.soft(await completedTodos.count()).toBe(1)
    await expect.soft(completedLabel).toHaveText(task1)

    await todoPage.clearCompletedButton.click()

    await todoPage.filterCompleted.click()
    const completedAfterClear = todoPage.todoItems
    expect.soft(await completedAfterClear.count()).toBe(0)

    await todoPage.filterActive.click()
    const activeTodosAfterClear = todoPage.todoItems.filter({ hasText: task2 })
    const activeLabelAfterClear = activeTodosAfterClear.locator('[data-testid="todo-item-label"]')
    expect.soft(await activeTodosAfterClear.count()).toBe(1)
    await expect.soft(activeLabelAfterClear).toHaveText(task2)
    await expect.soft(todoPage.todoCount).toHaveText('1 item left!')
  })

  test('checking that "toggle-all" is working correctly', async () => {
    const firstTodoText = await todoPage.getTodoTextByIndex(0)
    const secondTodoText = await todoPage.getTodoTextByIndex(1)
    expect.soft(firstTodoText).toBe(task1)
    expect.soft(secondTodoText).toBe(task2)

    await todoPage.toggleAllCheckbox.click()
    for (let i = 0; i < (await todoPage.todoItems.count()); i++) {
      const todo = todoPage.todoItems.nth(i)
      await expect.soft(todo).toHaveClass(/completed/)
    }
    await expect.soft(todoPage.todoCount).toHaveText('0 items left!')

    await todoPage.toggleAllCheckbox.click()
    for (let i = 0; i < (await todoPage.todoItems.count()); i++) {
      const todo = todoPage.todoItems.nth(i)
      await expect.soft(todo).not.toHaveClass(/completed/)
    }
    await expect.soft(todoPage.todoCount).toHaveText('2 items left!')

    const firstTodoTextAfterToggle = await todoPage.getTodoTextByIndex(0)
    const secondTodoTextAfterToggle = await todoPage.getTodoTextByIndex(1)
    expect.soft(firstTodoTextAfterToggle).toBe(task1)
    expect.soft(secondTodoTextAfterToggle).toBe(task2)
  })
})
