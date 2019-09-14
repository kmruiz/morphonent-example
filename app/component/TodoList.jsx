import { element } from 'morphonent'
import TodoItem from './TodoItem.jsx'

export default ({ items, onMarkItemAsDone }) =>
    <ul class="todo-list">
        { items.map(item => <TodoItem {...item} onMarkAsDone={onMarkItemAsDone}>{item.name}</TodoItem>)}
    </ul>