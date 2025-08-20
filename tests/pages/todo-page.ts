import { Locator, Page } from '@playwright/test'

export class TodoPage {
  readonly page: Page

  // Header
  readonly header: Locator
  readonly newTodoInputField: Locator

  // Main
  readonly toggleAllCheckbox: Locator
  readonly todoList: Locator
  readonly todoItems: Locator
  //readonly toDoItemToggle: Locator;
  readonly todoItemLabel: Locator

  // Footer
  readonly todoCount: Locator
  readonly filterAll: Locator
  readonly filterActive: Locator
  readonly filterCompleted: Locator
  readonly clearCompletedButton: Locator
  readonly footerInfo: Locator

  constructor(page: Page) {
    this.page = page

    // Header
    this.header = page.getByTestId('header')
    this.newTodoInputField = page.getByTestId('text-input')

    // Main
    this.toggleAllCheckbox = page.getByTestId('toggle-all')
    this.todoList = page.getByTestId('todo-list')
    this.todoItems = page.getByTestId('todo-item')
    this.todoItemLabel = page.getByTestId('todo-item-label')

    // Footer
    this.todoCount = page.locator('.todo-count')
    this.filterAll = page.getByTestId('a[href="#/"]')
    this.filterActive = page.locator('a[href="#/active"]')
    this.filterCompleted = page.locator('a[href="#/completed"]')
    this.clearCompletedButton = page.locator('.clear-completed')
    this.footerInfo = page.locator('.info')
  }

  async addTodo(todoText: string) {
    await this.newTodoInputField.fill(todoText)
    await this.newTodoInputField.press('Enter')
  }

  async getTodoTextByIndex(index: number): Promise<string> {
    const texts = await this.todoItemLabel.allTextContents()
    return texts[index]
  }

  async deleteTodoByName(name: string) {
    const todo = this.todoItems.filter({ hasText: name })
    await todo.hover()
    await todo.getByTestId('todo-item-button').click()
  }

  async completeTodoByName(name: string) {
    const todo = this.todoItems.filter({ hasText: name })
    await todo.getByTestId('todo-item-toggle').click()
  }
}
