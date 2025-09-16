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

    // показать все карты на старте на 1 секунду
    setTimeout(() => {
        cardsData.forEach((image, index) => {
            const cardId = `card-${index}`
            const front = document.getElementById(`${cardId}-front`)
            const back = document.getElementById(`${cardId}-back`)
            if (front) front.style.display = 'none'
            if (back) back.style.display = 'flex'
        })
    }, 1000)

    return { container, selectedImages, cardsData }
}

// обработка клика по карте
export function handleCardClick({ id, image, flippedCards, gameState, selectedImages }) {
    const cardFront = document.getElementById(`${id}-front`)
    const cardBack = document.getElementById(`${id}-back`)

    if (!cardFront || !cardBack) return

    // показать карту
    cardFront.style.display = 'block'
    cardBack.style.display = 'none'

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
            setTimeout(() => {
                flippedCards.forEach(c => {
                    const f = document.getElementById(`${c.cardId}-front`)
                    const b = document.getElementById(`${c.cardId}-back`)
                    if (f) f.style.display = 'none'
                    if (b) b.style.display = 'flex'
                })
                flippedCards.length = 0
            }, 800)
        }
    }
}
