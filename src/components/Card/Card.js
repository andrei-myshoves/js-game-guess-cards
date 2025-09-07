import * as styles from './Card.module.css'
import { htmlToElement } from '../../utils/htmlToELement'

export function Card(id, image, onClick) {
    const card = htmlToElement(`
    <div class="${styles.card}" id="card-${id}">
      <div class="${styles.cardInner}">
        <div class="${styles.cardFront}"></div>
        <div class="${styles.cardBack}">
          <img src="${image}" alt="card" />
        </div>
      </div>
    </div>
  `)

    card.addEventListener('click', () => {
        if (!card.classList.contains(styles.flipped)) {
            card.classList.add(styles.flipped)
            onClick(id, image, card)
        }
    })

    return card
}
