import * as styles from './Header.module.css'
import { Button } from '../Button/Button.js'

export function Header(title = '', showBack = false) {
    const header = document.createElement('header')
    header.className = styles.header

    const left = document.createElement('div')
    left.className = styles.left
    if (showBack) {
        const backBtn = Button({ id: 'backBtn', text: 'Назад', extraClass: styles.buttonBack })
        left.appendChild(backBtn)
    }

    const h1 = document.createElement('h1')
    h1.className = styles.title
    h1.textContent = title

    const right = document.createElement('div')
    right.className = styles.right

    header.append(left, h1, right)
    return header
}
