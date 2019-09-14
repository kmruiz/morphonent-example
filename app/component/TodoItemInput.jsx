import { element } from 'morphonent'

export default ({ onAddItem, onChangeInput, value }) => {
    function onKeyUp(event) {
        if (event.keyCode === 13) {
            return onAddItem(value);
        } else {
            return onChangeInput(event.currentTarget.value);
        }

    }

    return <div class="todo-input">
        <input type="text" onkeyup={onKeyUp} value={value} />
        <button onclick={() => onAddItem(value) }>Add</button>
    </div>
}