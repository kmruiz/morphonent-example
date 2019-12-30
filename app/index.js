import { renderOn } from 'morphonent'
import { login } from './doer'

window.onload = () => {
    renderOn('body', login)
}