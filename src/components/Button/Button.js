import * as styles from './Button.module.css'
import { htmlToElement } from '@utils/htmlToELement'

export function Button({ id, text, extraClass = '' }) {
    return htmlToElement(`
    <button id="${id}" class="${styles.button} ${extraClass}">
      ${text}
    </button>
  `)
}
