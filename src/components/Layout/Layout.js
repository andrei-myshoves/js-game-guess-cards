import { Header } from '../Header/Header.js'

export function Layout({ title = '', children, showBack = false }) {
    const layout = document.createElement('div')
    layout.className = 'layout'

    layout.appendChild(Header(title, showBack))

    const content = document.createElement('div')
    content.className = 'content'

    if (children instanceof HTMLElement) {
        content.appendChild(children)
    } else {
        content.textContent = children
    }

    layout.appendChild(content)
    return layout
}
