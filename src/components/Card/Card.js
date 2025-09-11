import * as styles from './Card.module.css'

export function Card(id, image) {
    const card = document.createElement('div')
    card.className = styles.card

    const back = document.createElement('div')
    back.className = styles.back
    back.textContent = '?'

    const front = document.createElement('div')
    front.className = styles.front

    const img = document.createElement('img')
    img.src = image
    front.appendChild(img)

    card.appendChild(back)
    card.appendChild(front)

    return card
}
