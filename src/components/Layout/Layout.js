import * as styles from './Layout.module.css'
import { Header } from '../Header/Header'

export function Layout({ title, children }) {
    const container = document.createElement('div')
    container.className = styles.layout

    const header = Header(title)
    container.appendChild(header)

    const main = document.createElement('main')
    main.className = styles.content

    if (typeof children === 'string') {
        main.innerHTML = children
    } else if (children instanceof HTMLElement) {
        main.appendChild(children)
    }

    container.appendChild(main)
    return container
}
