import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as pageStyles from './GamePage.module.css'
import { GameMenuHeader } from '../GameMenuHeader/GameMenuHeader.js'
import { levelTimes } from '../../index.js'
import { gameHistoryLSKey } from '../../constants.js'

const images = [
    '/img/Air.webp',
    '/img/Darkness.webp',
    '/img/Earth.webp',
    '/img/Fire.webp',
    '/img/Light.webp',
    '/img/Tree.webp',
    '/img/Water.webp',
]

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
})

function saveResultToHistory({ result, difficulty, duration }) {
    try {
        const history = JSON.parse(localStorage.getItem(gameHistoryLSKey)) || []
        const newEntry = {
            startedAt: new Date().toISOString(),
            result,
            difficulty,
            duration,
        }
        history.push(newEntry)
        localStorage.setItem(gameHistoryLSKey, JSON.stringify(history))
    } catch (error) {
        console.error('Ошибка при сохранении истории игры:', error)
    }
}

export function saveGameProgress({ selectedLevel, gameState, cardsData }) {
    try {
        const matchedCards = cardsData
            .map((_, index) => {
                const front = document.getElementById(`card-${index}-front`)
                const back = document.getElementById(`card-${index}-back`)
                if (!front || !back) {
                    return null
                }
                return front.style.display === 'block' ? index : null
            })
            .filter(i => i !== null)

        const progress = {
            selectedLevel,
            matchedCount: gameState.matchedCount,
            startTime: gameState.startTime,
            elapsedTime: Math.floor((Date.now() - gameState.startTime) / 1000),
            cardsData,
            matchedCards,
        }
        localStorage.setItem('activeGame', JSON.stringify(progress))
    } catch (e) {
        console.error('Ошибка при сохранении игры:', e)
    }
}

export function restoreGameProgress() {
    try {
        const saved = localStorage.getItem('activeGame')
        if (!saved) {
            return null
        }
        return JSON.parse(saved)
    } catch {
        return null
    }
}

export function GamePage({ selectedLevel = 'easy', onWinCallback, onLoseCallback }) {
    const container = htmlToElement('<div></div>')
    const header = GameMenuHeader()
    container.appendChild(header)

    const cardCount = levels[selectedLevel]
    const cardsContainer = htmlToElement(`
    <div id="cards-container" class="${pageStyles.cardsGrid} ${getGridClass(cardCount)}"></div>
  `)
    container.appendChild(cardsContainer)

    const savedProgress = restoreGameProgress()
    let cardsData
    const gameState = getDefaultGameState()

    if (savedProgress && savedProgress.selectedLevel === selectedLevel) {
        cardsData = savedProgress.cardsData
        gameState.matchedCount = savedProgress.matchedCount
        gameState.startTime = Date.now() - savedProgress.elapsedTime * 1000
    } else {
        const pairCount = Math.ceil(cardCount / 2)
        const selectedImages = [...images].slice(0, pairCount)
        cardsData = [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)
    }

    const flippedCards = []

    const handleWin = () => {
        const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000)
        saveResultToHistory({ result: 'win', difficulty: selectedLevel, duration: totalTime })
        localStorage.removeItem('activeGame')
        onWinCallback?.()
    }

    const handleLose = () => {
        const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000)
        saveResultToHistory({ result: 'lose', difficulty: selectedLevel, duration: totalTime })
        localStorage.removeItem('activeGame')
        onLoseCallback?.()
    }

    const levelDuration = levelTimes[selectedLevel] * 1000
    const remainingTime = savedProgress ? levelDuration - savedProgress.elapsedTime * 1000 : levelDuration

    setTimeout(handleLose, remainingTime)

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const card = Card(cardId, image)
        card.addEventListener('click', () => {
            handleCardClick({
                id: cardId,
                image,
                flippedCards,
                gameState,
                cardCount,
                onWin: handleWin,
            })
            saveGameProgress({ selectedLevel, gameState, cardsData })
        })
        cardsContainer.appendChild(card)
    })

    return {
        container,
        cardsData,
        cardCount,
        gameState,
        loseGame: handleLose,
    }
}

export function handleCardClick({ id, image, flippedCards, gameState, cardCount, onWin }) {
    if (gameState.locked) {
        return
    }

    const cardFront = document.getElementById(`${id}-front`)
    const cardBack = document.getElementById(`${id}-back`)
    if (!cardFront || !cardBack || cardFront.style.display === 'block') {
        return
    }

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

            document.getElementById('guessedCount').textContent = String(gameState.matchedCount)
            document.getElementById('remainingCount').textContent = String(cardCount / 2 - gameState.matchedCount)

            if (gameState.matchedCount === cardCount / 2) {
                setTimeout(onWin, 300)
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(c => {
                    const f = document.getElementById(`${c.cardId}-front`)
                    const b = document.getElementById(`${c.cardId}-back`)
                    if (f) {
                        f.style.display = 'none'
                    }
                    if (b) {
                        b.style.display = 'flex'
                    }
                })
                flippedCards.length = 0
                gameState.locked = false
            }, 800)
        }
    }
}
