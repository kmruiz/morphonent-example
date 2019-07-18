import { renderOn, element } from 'morphonent'

function todoItem({ id, name, done }, { onMarkAsDone }) {
    return element('li', { 'data-id': id, class: `todo-item ${done ? 'done' : 'pending'}` }, 
        element('span', { class: 'name' }, name),
        element('button', { class: 'mark-as-done', onclick: () => onMarkAsDone(id) }, '👌'))
}

function todoList({ items }, { onMarkItemAsDone }) {
    return element('ul', { class: 'todo-list' },
        items.map(item => todoItem(item, { onMarkAsDone: onMarkItemAsDone }))
    )
}

function itemInput({ value }, { onAddItem, onChangeInput }) {
    function onKeyUp(event) {
        if (event.keyCode === 13) {
            return onAddItem(value);
        } else {
            return onChangeInput(event.currentTarget.value);
        }

    }
    return element('div', { class: 'todo-input' },
        element('input', { type: 'text', onkeyup: onKeyUp, value }),
        element('button', { onclick: () => onAddItem(value) }, 'Add')
    )
}

function todoListApplication({ todoItemInput, items }) {
    function withNewTodoItem(items, item) {
        if (item.trim() === '') return items;
        
        return items.concat({ id: +(new Date()), name: item, done: false })
    }
    
    function withDoneTodoItem(items, itemId) {
        return items.map(item => item.id === itemId ? { ...item, done: true } : item)
    }

    return element('div', { class: 'todo-app' },
        todoList({ items }, { onMarkItemAsDone: (itemId) => todoListApplication({ todoItemInput, items: withDoneTodoItem(items, itemId) }) }),
        itemInput({ value: todoItemInput }, { 
            onAddItem: (text) => todoListApplication({ todoItemInput: '', items: withNewTodoItem(items, text)}), 
            onChangeInput: input => todoListApplication({ todoItemInput: input, items })}
        )
    )
}

window.onload = () => {
    renderOn('body', todoListApplication({ todoItemInput: '', items: [] }))
}
