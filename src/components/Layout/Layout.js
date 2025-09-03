import { Header } from '../Header/Header.js'
import { htmlToElement } from '../../utils/htmlToELement.js'

export function Layout({ title = '', children = '', showBack = false }) {
    return htmlToElement(`
    <div class="layout">
      ${Header(title, showBack).outerHTML}
      <div class="content">
        ${children instanceof HTMLElement ? children.outerHTML : children}
      </div>
    </div>
  `)
}
