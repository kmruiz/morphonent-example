import { testing, click } from 'morphonent-test'
import { todoList } from './component/todoList'

const randomItem = done => ({ id: +new Date(), title: '' + Math.random(), done })

describe('todoList', () => {
    describe('item rendering', () => {
        it('should render the item information', async () => {
            const item = randomItem(false)
            const itemElement = await testing(todoList([ item ]))
                                .findById('item-' + item.id)

            const foundTitle = await itemElement.textContent()
            const foundId = await itemElement.attribute('id')
            const foundClass = await itemElement.attribute('class')

            expect(foundTitle).toBe(item.title)
            expect(foundId).toBe("item-" + item.id)
            expect(foundClass).toBe('pending')
        })

        it('should render each item in the list', async () => {
            const result = await testing(todoList([ randomItem(false), randomItem(false) ]))
                            .findById('todo-list')
                            .findChildren()
                            .count()

            expect(result).toBe(2)
        })
    })

    describe('adding items', () => {
        it('should render the new item information', async () => {
            const text = 'Hello World!'
            const foundTitle = await testing(todoList([]))
                                .findById('todo-list-item-input')
                                .write(text)
                                .findById('todo-list-item-submit')
                                .trigger(click())
                                .findById('item-1')
                                .textContent()

            expect(foundTitle).toBe(text)
        })
    })

    describe('marking items as done', () => {
        it('should render the new item information', async () => {
            const item = randomItem(false)
            const foundClass = await testing(todoList([item]))
                                .findById('item-' + item.id)
                                .trigger(click())
                                .findById('item-' + item.id)
                                .attribute('class')

            expect(foundClass).toBe('done')
        })
    })
})