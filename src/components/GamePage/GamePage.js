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

export function handleCardClick({ id, image, flippedCards, gameState, selectedImages }) {
    flippedCards.push({ cardId: id, image })

    // показать карту
    const cardFront = document.getElementById(`${id}-front`)
    cardFront.style.display = 'block'

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards

        if (first.image === second.image) {
            // если совпали
            gameState.matchedCount++
            flippedCards.length = 0

            // проверяем победу
            if (gameState.matchedCount === selectedImages.length) {
                setTimeout(() => alert('Ты победил! 🎉'), 300)
            }
        } else {
            // если не совпали — скрыть обе обратно
            setTimeout(() => {
                const firstFront = document.getElementById(`${first.cardId}-front`)
                const secondFront = document.getElementById(`${second.cardId}-front`)

                if (firstFront) firstFront.style.display = 'none'
                if (secondFront) secondFront.style.display = 'none'

                flippedCards.length = 0
            }, 800)
        }
    }
}
