import * as styles from './Card.module.css'
import { htmlToElement } from '../../utils/htmlToELement.js'

export function Card(id, image) {
    return htmlToElement(`
    <div class="${styles.card}" id="${id}">
      <div class="${styles.back}">?</div>
      <div class="${styles.front}" id="${id}-front">
        <img src="${image}" alt="card"/>
      </div>
    </div>
  `)
}
