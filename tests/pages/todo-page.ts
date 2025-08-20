import {Locator, Page} from "@playwright/test";

export class ToDoPage {
    readonly page: Page

    // Header
    readonly header: Locator;
    readonly newTodoInputField: Locator;

    // Main
    readonly toggleAllCheckbox: Locator;
    readonly todoList: Locator;
    readonly todoItems: Locator;
    readonly toDoItemToggle: Locator;
    readonly todoItemLabel: Locator;
    readonly todoItemDeleteButton: Locator;

    // Footer
    readonly todoCount: Locator;
    readonly filterAll: Locator;
    readonly filterActive: Locator;
    readonly filterCompleted: Locator;
    readonly clearCompletedButton: Locator;
    readonly footerInfo: Locator;


    constructor(page: Page) {
        this.page = page

        // Header
        this.header = page.getByTestId('header');
        this.newTodoInputField = page.getByTestId('text-input');

        // Main
        this.toggleAllCheckbox = page.getByTestId('toggle-all');
        this.todoList = page.getByTestId('todo-list');
        this.todoItems = page.getByTestId('todo-item')
        this.toDoItemToggle = page.getByTestId('todo-item-toggle')
        this.todoItemLabel = page.getByTestId('todo-item-label');
        this.todoItemDeleteButton = page.getByTestId('todo-item-button');

        // Footer
        this.todoCount = page.locator('.todo-count');
        this.filterAll = page.getByTestId('a[href="#/"]');
        this.filterActive = page.locator('a[href="#/active"]');
        this.filterCompleted = page.getByTestId('a[href="#/completed"]');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.footerInfo = page.locator('.info');
    }

}