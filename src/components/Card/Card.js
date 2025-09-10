import * as styles from './Card.module.css'
import { htmlToElement } from '../../utils/htmlToELement'

export function Card(id, image, onClick) {
  const card = htmlToElement(`
    <div class="${styles.card}" data-id="${id}" data-image="${image}">
      <img src="${image}" alt="card" />
    </div>
  `)

  card.addEventListener('click', () => {
    onClick(id, image, card)
  })

  return card
}