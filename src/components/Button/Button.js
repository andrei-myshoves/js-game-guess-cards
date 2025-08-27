import * as styles from './Button.module.css'

export function Button({ id, text }) {
    return `<button id="${id}" class="${styles.button}">${text}</button>`
}
