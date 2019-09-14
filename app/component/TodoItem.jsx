import { element } from 'morphonent'

export default ({ id, onMarkAsDone, done }, name) =>
    <li data-id={id} class={`todo-item ${done ? 'done' : 'pending'}`}>
        <span class="name">{name}</span>
        <button class="mark-as-done" onclick={() => onMarkAsDone(id)}>👌</button>
    </li>
