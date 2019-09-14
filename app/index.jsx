import { renderOn, element } from 'morphonent'
import TodoListApplication from './TodoListApplication.jsx';

window.onload = () => {
    renderOn('body', <TodoListApplication todoItemInput="" items={[]} />)
}
