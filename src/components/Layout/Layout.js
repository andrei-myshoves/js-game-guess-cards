import { Header } from '@/components/Header/Header'
import { htmlToElement } from '@/utils/htmlToELement'
import * as styles from './Layout.module.css'

export function Layout({ title = '', children = '', showBack = false }) {
    const layoutEl = htmlToElement(`
        <div class="${styles.container}">
            <div class="${styles.layout}">
                <div id="headerContainer"></div>
                <div id="childrenContainer"></div>
            </div>
        </div>
    `)

    layoutEl.getElementById = function (id) {
        return this.querySelector(`#${id}`)
    }

    const headerContainer = layoutEl.getElementById('headerContainer')
    if (title) {
        headerContainer.appendChild(Header(title, showBack))
    } else {
        headerContainer.remove()
    }

    const childrenContainer = layoutEl.getElementById('childrenContainer')
    if (childrenContainer) {
        if (children instanceof HTMLElement) {
            childrenContainer.appendChild(children)
        } else {
            childrenContainer.innerHTML = children
        }
    }

    return layoutEl
}
