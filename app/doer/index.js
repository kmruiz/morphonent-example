import { allDoneTodoList, todoList } from './component/todoList'

let id = 0

function isAnAmazingDoer(todos) {
    return todos.length > 3 && todos.every(item => item.done)
}

export function addItemToTodoList(todos, title) {
    id = ++id
    const todoItem = { id, title, done: false }
    return todoList(todos.concat(todoItem))
}

export function toggleItemState(todos, itemId) {
    const newTodos = [...todos]
    const itemIndex = newTodos.findIndex(todo => todo.id === itemId)

    const newItem = { ... newTodos[itemIndex], done: !newTodos[itemIndex].done }
    newTodos.splice(itemIndex, 1, newItem)

    if (isAnAmazingDoer(newTodos)) {
        return allDoneTodoList(newTodos)
    } 
    
    return todoList(newTodos)
}

export function login() {
    return todoList([])
}