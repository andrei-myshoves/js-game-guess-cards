import * as styles from './Button.module.css'

export function Button({ id, text, extraClass = '' }) {
    const classNames = [styles.button, extraClass].filter(Boolean).join(' ')
    return `<button id="${id}" class="${classNames}">${text}</button>`
}
