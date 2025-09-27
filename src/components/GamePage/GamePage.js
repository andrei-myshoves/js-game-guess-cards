import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as pageStyles from './GamePage.module.css'
import { GameMenuHeader } from '../GameMenuHeader/GameMenuHeader.js'

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
    const container = htmlToElement(`<div></div>`)

    // верхняя панель (таймер + прогресс)
    const header = GameMenuHeader()
    container.appendChild(header)

    // сетка карточек
    const cardsContainer = htmlToElement(`
    <div id="cards-container" class="${pageStyles.cardsGrid}"></div>
  `)
    container.appendChild(cardsContainer)

    const cardCount = levels[selectedLevel]
    const _selectedImages = [...images].slice(0, Math.ceil(cardCount / 2))
    const cardsData = [..._selectedImages, ..._selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const card = Card(cardId, image)
        cardsContainer.appendChild(card)
    })

    // инициализация прогресса
    const guessedEl = document.getElementById('guessedCount')
    const remainingEl = document.getElementById('remainingCount')
    if (guessedEl) guessedEl.textContent = '0'
    if (remainingEl) remainingEl.textContent = String(cardCount / 2)

    return { container, selectedImages: _selectedImages, cardsData, cardCount }
}

export function handleCardClick({ id, image, flippedCards, gameState, cardCount, onWin }) {
    if (gameState.locked) return

    const cardFront = document.getElementById(`${id}-front`)
    const cardBack = document.getElementById(`${id}-back`)

    if (!cardFront || !cardBack || cardFront.style.display === 'block') return

    cardFront.style.display = 'block'
    cardBack.style.display = 'none'

    flippedCards.push({ cardId: id, image })

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards
        gameState.locked = true

        if (first.image === second.image) {
            gameState.matchedCount++
            flippedCards.length = 0
            gameState.locked = false

            const guessedEl = document.getElementById('guessedCount')
            const remainingEl = document.getElementById('remainingCount')
            if (guessedEl) guessedEl.textContent = String(gameState.matchedCount)
            if (remainingEl) remainingEl.textContent = String(cardCount / 2 - gameState.matchedCount)

            if (gameState.matchedCount === cardCount / 2) {
                setTimeout(() => onWin(), 300)
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
                gameState.locked = false
            }, 800)
        }
    }
}
