import { Card } from '@/components/Card/Card'
import { htmlToElement } from '@/utils/htmlToELement'
import * as pageStyles from './GamePage.module.css'
import { GameMenuHeader } from '@/components/GameMenuHeader/GameMenuHeader'
import { gameHistoryLSKey } from '@/constants'

const images = [
    '/img/Air.webp',
    '/img/Darkness.webp',
    '/img/Earth.webp',
    '/img/Fire.webp',
    '/img/Light.webp',
    '/img/Tree.webp',
    '/img/Water.webp',
]

export function generateCards(selectedLevel) {
    const cardCount = levels[selectedLevel]
    const pairCount = Math.ceil(cardCount / 2)
    const selectedImages = [...images].slice(0, pairCount)
    return [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)
}

export const levels = { easy: 6, medium: 10, hard: 14 }

function getGridClass(cardCount) {
    if (cardCount <= 6) {
        return pageStyles.easyGrid
    }
    if (cardCount <= 10) {
        return pageStyles.mediumGrid
    }
    return pageStyles.hardGrid
}

export const getDefaultGameState = () => ({
    locked: false,
    matchedCount: 0,
    startTime: Date.now(),
    timerId: null,
    elapsedTime: 0,
    matchedCards: [],
})

export function saveResultToHistory({ result, difficulty, duration }) {
    try {
        const history = JSON.parse(localStorage.getItem(gameHistoryLSKey)) || []
        history.push({
            startedAt: new Date().toISOString(),
            result,
            difficulty,
            duration,
        })
        localStorage.setItem(gameHistoryLSKey, JSON.stringify(history))
    } catch (error) {
        console.error('Ошибка при сохранении истории игры:', error)
    }
}

export function saveGameProgress({ selectedLevel, gameState, cardsData }) {
    if (gameState.gameFinished) {
        return
    }
    const progress = {
        selectedLevel,
        matchedCount: gameState.matchedCount,
        elapsedTime: gameState.elapsedTime,
        cardsData,
        matchedCards: gameState.matchedCards,
    }
    localStorage.setItem('activeGame', JSON.stringify(progress))
}

export function updateGameProgress(gameState) {
    if (gameState.gameFinished) {
        return
    }
    const lastGameProgress = localStorage.getItem('activeGame')
    if (!lastGameProgress) {
        return
    }
    try {
        const parsed = JSON.parse(lastGameProgress)
        const progress = {
            ...parsed,
            matchedCards: gameState.matchedCards,
            matchedCount: gameState.matchedCount,
        }
        localStorage.setItem('activeGame', JSON.stringify(progress))
    } catch (e) {
        console.error('Ошибка при обновлении прогресса игры:', e)
    }
}

export function restoreGameProgress() {
    try {
        const saved = localStorage.getItem('activeGame')
        return saved ? JSON.parse(saved) : null
    } catch {
        return null
    }
}

export function GamePage({ selectedLevel = 'easy', onWinCallback, onLoseCallback }) {
    const container = htmlToElement('<div></div>')
    const header = GameMenuHeader()
    container.appendChild(header)

    const cardCount = levels[selectedLevel]
    const cardsContainer = htmlToElement(
        `<div id="cards-container" class="${pageStyles.cardsGrid} ${getGridClass(cardCount)}"></div>`
    )
    container.appendChild(cardsContainer)

    const savedProgress = restoreGameProgress()
    let cardsData
    const gameState = getDefaultGameState()

    if (savedProgress && savedProgress.selectedLevel === selectedLevel && savedProgress.matchedCount < cardCount / 2) {
        cardsData = savedProgress.cardsData
        gameState.matchedCount = savedProgress.matchedCount
        gameState.matchedCards = Array.isArray(savedProgress.matchedCards) ? savedProgress.matchedCards : []
        gameState.elapsedTime = savedProgress.elapsedTime
    } else {
        const pairCount = Math.ceil(cardCount / 2)
        const selectedImages = [...images].slice(0, pairCount)
        cardsData = [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)
        gameState.elapsedTime = 0
        localStorage.removeItem('activeGame')
    }

    const flippedCards = []

    const endGame = result => {
        if (gameState.gameFinished) {
            return
        }
        gameState.gameFinished = true
        const totalTime = gameState.elapsedTime
        saveResultToHistory({ result, difficulty: selectedLevel, duration: totalTime })
        localStorage.removeItem('activeGame')
        if (timerInterval) {
            clearInterval(timerInterval)
        }
        if (result === 'win') {
            onWinCallback?.()
        } else {
            onLoseCallback?.()
        }
    }

    let timerInterval = null

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const card = Card(cardId, image)
        card.addEventListener('click', () => {
            handleCardClick({ id: cardId, image, flippedCards, gameState, cardCount, onWin: () => endGame('win') })
            updateGameProgress(gameState)
        })
        cardsContainer.appendChild(card)
    })

    return { container, cardsData, cardCount, gameState, loseGame: () => endGame('lose') }
}

export function handleCardClick({ id, image, flippedCards, gameState, cardCount, onWin }) {
    if (gameState.locked) {
        return
    }

    const cardElement = document.getElementById(id)
    if (!cardElement || cardElement.dataset.flipped === 'true') {
        return
    }

    cardElement.classList.add('flipped')
    cardElement.dataset.flipped = 'true'
    flippedCards.push({ cardId: id, image })

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards
        gameState.locked = true

        if (first.image === second.image) {
            gameState.matchedCount++
            const firstIndex = parseInt(first.cardId.split('-')[1], 10)
            const secondIndex = parseInt(second.cardId.split('-')[1], 10)
            gameState.matchedCards.push(firstIndex, secondIndex)

            document.getElementById(first.cardId)?.classList.add('matched')
            document.getElementById(second.cardId)?.classList.add('matched')

            flippedCards.length = 0
            gameState.locked = false

            document.getElementById('guessedCount').textContent = String(gameState.matchedCount)
            document.getElementById('remainingCount').textContent = String(cardCount / 2 - gameState.matchedCount)

            if (gameState.matchedCount === cardCount / 2) {
                setTimeout(onWin, 300)
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(c => {
                    const cardEl = document.getElementById(c.cardId)
                    if (cardEl) {
                        cardEl.classList.remove('flipped')
                        cardEl.dataset.flipped = 'false'
                    }
                })
                flippedCards.length = 0
                gameState.locked = false
            }, 800)
        }
    }
}
