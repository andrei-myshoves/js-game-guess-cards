import { Button } from '../Button/Button.js'
import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as pageStyles from './GamePage.module.css'

const images = [
    '/img/Air.webp',
    '/img/Darkness.webp',
    '/img/Earth.webp',
    '/img/Fire.webp',
    '/img/Light.webp',
    '/img/Tree.webp',
    '/img/Water.webp',
]

const levels = { easy: 6, medium: 10, hard: 16 }

export function GamePage(selectedLevel = 'easy') {
    const container = htmlToElement(`
    <div>
      <div id="timer">00:00</div>
      <div id="cards-container" class="${pageStyles.cardsGrid}"></div>
    </div>
  `)

    const cardsContainer = container.querySelector('#cards-container')

    const endBtn = Button({
        id: 'endGameBtn',
        text: 'Завершить игру',
        extraClass: '',
    })
    container.appendChild(endBtn)

    // Вставка карточек в HTML start
    const cardCount = levels[selectedLevel]
    const selectedImages = [...images].slice(0, Math.ceil(cardCount / 2))
    const cardsData = [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)
    // Вставка карточек в HTML end

    cardsData.forEach((image, index) => {
        const cardId = index + image
        const card = Card(cardId, image)
        cardsContainer.appendChild(card)
    })

    return { container, selectedImages, cardsData }
}

export function handleCardClick({ id, image, cardEl, innerEl, flippedCards, matchedCount, selectedImages }) {
    flippedCards.push({ cardId: id, image, cardEl, innerEl })

    console.log('@1', flippedCards)

    // здесь нужно убрать условие и менять стили при клике на первое нажатие снимать display none при втором сравнивать и либо оставлять у обоих display none если не совпали, либо делать для обеих display block
    if (flippedCards[0]) {
        const firstEl = flippedCards[0]
        const cardFront = document.getElementById(`${firstEl.cardId}-front`)
        cardFront.style.display = 'block'
    }

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards

        console.log('@2', [first, second])

        if (first.image === second.image) {
            matchedCount++
            flippedCards.pop()
            flippedCards.pop()
            console.log('@4', flippedCards, matchedCount)
            if (matchedCount === selectedImages.length) {
                setTimeout(() => alert('Ты победил! 🎉'), 300)
            }
        } else {
            // здесь по-новому
        }
    }
}
