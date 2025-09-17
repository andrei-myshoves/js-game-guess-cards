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

    const cardCount = levels[selectedLevel]
    const selectedImages = [...images].slice(0, Math.ceil(cardCount / 2))
    const cardsData = [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const card = Card(cardId, image)
        cardsContainer.appendChild(card)
    })

    return { container, selectedImages, cardsData }
}

export function handleCardClick({ id, image, flippedCards, gameState, selectedImages }) {
    if (gameState.locked) return

    const cardFront = document.getElementById(`${id}-front`)
    const cardBack = document.getElementById(`${id}-back`)
    if (!cardFront || !cardBack) return

    if (cardFront.style.display === 'block') return

    cardFront.style.display = 'block'
    cardBack.style.display = 'none'

    if (flippedCards.some(c => c.cardId === id)) return
    flippedCards.push({ cardId: id, image })

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards

        if (first.image === second.image) {
            gameState.matchedCount++
            flippedCards.length = 0

            if (gameState.matchedCount === selectedImages.length) {
                setTimeout(() => alert('Ты победил! 🎉'), 300)
            }
        } else {
            gameState.locked = true
            setTimeout(() => {
                const f1 = document.getElementById(`${first.cardId}-front`)
                const b1 = document.getElementById(`${first.cardId}-back`)
                const f2 = document.getElementById(`${second.cardId}-front`)
                const b2 = document.getElementById(`${second.cardId}-back`)

                if (f1) f1.style.display = 'none'
                if (b1) b1.style.display = 'flex'
                if (f2) f2.style.display = 'none'
                if (b2) b2.style.display = 'flex'

                flippedCards.length = 0
                gameState.locked = false
            }, 800)
        }
    }
}
