import * as styles from './Card.module.css'
import { htmlToElement } from '@/utils/htmlToELement'

export function Card(id, image, index = 0) {
    const card = htmlToElement(`
      <div class="${styles.card}" id="${id}" data-flipped="false">
        <div class="${styles.cardInner}">
          <div class="${styles.back}" id="${id}-back">?</div>
          <div class="${styles.front}" id="${id}-front">
            <img src="${image}" alt="card"/>
          </div>
        </div>
      </div>
    `)

    card.style.animationDelay = `${index * 0.05}s`

    return card
}
