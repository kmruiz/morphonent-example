import { allDoneTodoList, todoList } from './component/todoList'

let id = 0

function isAnAmazingDoer(todos) {
    return todos.length > 3 && todos.every(item => item.done)
}

function enhancedTodoList(todoItems, inputValue) {
    if (isAnAmazingDoer(todoItems)) {
        return allDoneTodoList(todoItems, inputValue)
    }

    return todoList(todoItems, inputValue)
}

export function addItemToTodoList(todos, title) {
    id = ++id
    const todoItem = { id, title, done: false }
    return enhancedTodoList(todos.concat(todoItem))
}

export function toggleItemState(todos, itemId) {
    const newTodos = [...todos]
    const itemIndex = newTodos.findIndex(todo => todo.id === itemId)

    const newItem = { ... newTodos[itemIndex], done: !newTodos[itemIndex].done }
    newTodos.splice(itemIndex, 1, newItem)

    return enhancedTodoList(newTodos)
}

export function toggleAll(todoItems, inputValue) {
    const areAllDone = todoItems.every(item => item.done === true)
    if (areAllDone) {
        todoItems = todoItems.map(item => ({ ...item, done: false }))
    } else {
        todoItems = todoItems.map(item => ({ ...item, done: true }))
    }

    return enhancedTodoList(todoItems, inputValue)
}

export function login() {
    return todoList([])
}