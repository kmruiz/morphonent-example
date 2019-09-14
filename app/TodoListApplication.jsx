import TodoList from './component/TodoList.jsx'
import TodoItemInput from './component/TodoItemInput.jsx'
import { element } from 'morphonent'

export default function TodoListApplication({ todoItemInput, items }) {
    function withNewTodoItem(items, item) {
        console.log(items, item);
        if (item.trim() === '') return items;
        
        return items.concat({ id: +(new Date()), name: item, done: false })
    }
    
    function withDoneTodoItem(items, itemId) {
        return items.map(item => item.id === itemId ? { ...item, done: true } : item)
    }

    return <div class="todo-app">
        <TodoList items={items} onMarkItemAsDone={itemId => <TodoListApplication todoItemInput={todoItemInput} items={withDoneTodoItem(items, itemId)} />} />
        <TodoItemInput 
            onAddItem={text => <TodoListApplication todoItemInput="" items={withNewTodoItem(items, text)} />}
            onChangeInput={input => <TodoListApplication todoItemInput={input} items={items} />}
            value={todoItemInput} />
    </div>
}