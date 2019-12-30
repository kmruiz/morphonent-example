import { element } from 'morphonent'
import { addItemToTodoList, toggleItemState, toggleAll } from '../'

function todoItem(todoItems, item) {
    return element('li', {},
        element('span', { id: 'item-' + item.id, onclick: () => toggleItemState(todoItems, item.id), class: item.done ? 'done' : 'pending' }, item.title)
    )
}

function todoItemInput(todoItems, inputValue, onkeyup) {
    return element('div', {},
        element('input', { id: 'todo-list-item-input', type: 'text', value: inputValue, onkeyup }),
        element('button', { id: 'todo-list-item-submit', onclick: () => addItemToTodoList(todoItems, inputValue) }, 'Add Item')
    )
}

function toggleAllButton(todoItems, inputValue) {
    return element('button', { id: 'toggle-all-button', onclick: () => toggleAll(todoItems, inputValue) }, 'Toggle All')
}

export function allDoneTodoList(todoItems, inputValue = '') {
    return element('div', {},
        element('div', {}, element('h1', { style: 'font-size: 30vh; text-align: center;' }, '🎉')),
        todoItemInput(todoItems, inputValue, (ev) => todoList(todoItems, ev.currentTarget.value)),
        toggleAllButton(todoItems, inputValue)
    )
}

export function todoList(todoItems, inputValue = '') {
    return element('div', {},
        element('div', {},
            element('ul', { id: 'todo-list' },
                todoItems.map(item => todoItem(todoItems, item))
            )
        ),
        todoItemInput(todoItems, inputValue, (ev) => todoList(todoItems, ev.currentTarget.value)),
        toggleAllButton(todoItems, inputValue)
    )
}
