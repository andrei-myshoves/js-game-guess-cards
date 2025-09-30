import { Header } from '../Header/Header.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './Layout.module.css'

export function Layout({ title = '', children = '', showBack = false }) {
    const layoutEl = htmlToElement(`
      <div class="${styles.container}">
        <div class="${styles.layout}">
          ${Header(title, showBack).outerHTML}
          <div id="childrenContainer"></div>
        </div>
      </div>
    `)

    const childrenContainer = layoutEl.querySelector('#childrenContainer')

    if (childrenContainer) {
        if (children instanceof HTMLElement) {
            childrenContainer.appendChild(children)
        } else {
            childrenContainer.innerHTML = children
        }
    }

    return layoutEl
}
