import * as styles from './Header.module.css'
import { Button } from '@/components/Button/Button'
import { htmlToElement } from '@/utils/htmlToELement'

export function Header(title = '', showBack = false) {
    const backBtn = showBack ? Button({ id: 'backBtn', text: 'Назад', extraClass: styles.buttonBack }).outerHTML : ''

    return htmlToElement(`
    <header class="${styles.header}">
      <div class="${styles.left}">
        ${backBtn}
      </div>
      <h1 class="${styles.title}">${title}</h1>
      <div class="${styles.right}"></div>
    </header>
  `)
}
