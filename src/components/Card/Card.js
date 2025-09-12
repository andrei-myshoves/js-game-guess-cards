import * as styles from './Card.module.css'
import { htmlToElement } from '../../utils/htmlToELement.js'

export function Card(id, image) {
    return htmlToElement(`
    <div class="${styles.card}" data-id="${id}">
      <div class="${styles.back}">?</div>
      <div class="${styles.front}">
        <img src="${image}" alt="card"/>
      </div>
    </div>
  `)
}
