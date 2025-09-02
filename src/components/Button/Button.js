import * as styles from './Button.module.css'

export function Button({ id, text, extraClass = '' }) {
    const btn = document.createElement('button')
    btn.id = id
    btn.className = `${styles.button} ${extraClass}`.trim()
    btn.textContent = text
    return btn
}
