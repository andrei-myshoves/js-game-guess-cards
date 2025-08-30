import * as styles from './Header.module.css'

export function Header(title = '') {
    const header = document.createElement('header')
    header.className = styles.header
    header.textContent = title
    return header
}
