import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import {
    GamePage,
    handleCardClick,
    restoreGameProgress,
    saveGameProgress,
    generateCards,
    getDefaultGameState,
} from './components/GamePage/GamePage.js'
import { startTimer, stopTimer, pauseTimer, resumeTimer } from './components/Timer/Timer.js'
import { Button } from './components/Button/Button.js'
import { GameRules } from './components/GameRules/GameRules.js'
import { HistoryGame } from './components/HistoryGame/HistoryGame.js'
import './style.css'
import { selectedLevelLSKey, currentPageLSKey, gameHistoryLSKey } from './constants.js'

const root = document.getElementById('root')

export const levelTimes = {
    easy: 180,
    medium: 120,
    hard: 60,
}

export function setPage(page) {
    root.innerHTML = ''

    switch (page) {
        case 'mainPage': {
            renderMainMenu()
            break
        }
        case 'historyPage': {
            const layout = HistoryGame()
            root.appendChild(layout)

            document.getElementById('backBtn')?.addEventListener('click', () => setPage('mainPage'))
            document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
                localStorage.removeItem(gameHistoryLSKey)
                setPage('historyPage')
            })
            document.getElementById('startGameBtn')?.addEventListener('click', () => setPage('gamePage'))
            document.getElementById('repeatGameBtn')?.addEventListener('click', () => setPage('gamePage'))
            break
        }
        case 'gamePage': {
            const level = localStorage.getItem(selectedLevelLSKey)
            if (level) {
                renderGamePage(level)
                localStorage.removeItem(selectedLevelLSKey)
            } else {
                renderPageWithBack({
                    title: 'Выберите сложность',
                    nextTitle: GameSettingsMenu(),
                    isSettingsMenu: true,
                    pageName: 'mainPage',
                })
            }
            break
        }
        case 'leaderboardPage': {
            import('./components/LeaderboardPage/LeaderboardPage.js').then(({ LeaderboardPage }) => {
                LeaderboardPage().then(container => {
                    const layout = Layout({
                        title: 'Таблица лидеров',
                        children: container,
                        showBack: true,
                    })
                    root.innerHTML = ''
                    root.appendChild(layout)

                    document.getElementById('backBtn')?.addEventListener('click', () => setPage('mainPage'))
                })
            })
            break
        }
        case 'settingsPage': {
            renderPageWithBack({
                title: 'Инструкция',
                nextTitle: GameRules(),
                pageName: 'mainPage',
            })
            break
        }
        default: {
            console.warn(`Неизвестная страница: ${page}, возвращаемся в главное меню`)
            setPage('mainPage')
            break
        }
    }

    localStorage.setItem(currentPageLSKey, page)
}

function renderMainMenu() {
    const layout = Layout({
        children: GameMenu(),
        showBack: false,
    })
    root.appendChild(layout)

    menuItems.forEach(item => {
        const btn = document.getElementById(item.id)
        if (btn) {
            btn.addEventListener('click', () => setPage(item.id))
        }
    })
}

function renderPageWithBack({
    title,
    nextTitle,
    isSettingsMenu = false,
    pageName = 'mainPage',
    showBackButton = true,
}) {
    const layout = Layout({
        title,
        children: nextTitle,
        showBack: showBackButton,
    })
    root.appendChild(layout)

    document.getElementById('backBtn')?.addEventListener('click', () => setPage(pageName))

    if (isSettingsMenu) {
        const handleSelect = level => {
            localStorage.setItem(selectedLevelLSKey, level)

            const gameState = getDefaultGameState()

            const cardsData = generateCards(level)
            saveGameProgress({ selectedLevel: level, gameState, cardsData })

            setPage('gamePage')
        }

        document.getElementById('easy')?.addEventListener('click', () => handleSelect('easy'))
        document.getElementById('medium')?.addEventListener('click', () => handleSelect('medium'))
        document.getElementById('hard')?.addEventListener('click', () => handleSelect('hard'))
    }
}

function renderGamePage(selectedLevel) {
    const flippedCards = []

    const onWinCallback = () => {
        stopTimer()
        alert('Вы победили!')
        setPage('mainPage')
    }

    const onLoseCallback = () => {
        stopTimer()
        alert('Вы проиграли!')
        setPage('mainPage')
    }

    const gamePageInstance = GamePage({ selectedLevel, onWinCallback, onLoseCallback })
    const { container, cardsData, cardCount, gameState } = gamePageInstance

    const layout = Layout({ title: 'Игра', children: container, showBack: true })
    root.innerHTML = ''
    root.appendChild(layout)

    const endBtn = Button({ id: 'endGameBtn', text: 'Завершить игру' })
    document.getElementById('childrenContainer')?.appendChild(endBtn)

    document.getElementById('guessedCount').textContent = String(gameState.matchedCount)
    document.getElementById('remainingCount').textContent = String(cardCount / 2 - gameState.matchedCount)

    const timerEl = document.getElementById('timer')

    const savedProgress = restoreGameProgress()
    let previewTime = 5
    let showPreview = true

    if (
        savedProgress &&
        savedProgress.selectedLevel === selectedLevel &&
        (savedProgress.matchedCount > 0 || savedProgress.elapsedTime > 0)
    ) {
        showPreview = false
        gameState.matchedCount = savedProgress.matchedCount
        gameState.startTime = Date.now() - savedProgress.elapsedTime * 1000
        const matchedCards = Array.isArray(savedProgress.matchedCards) ? savedProgress.matchedCards : []

        cardsData.forEach((image, index) => {
            const front = document.getElementById(`card-${index}-front`)
            const back = document.getElementById(`card-${index}-back`)
            if (matchedCards.includes(index)) {
                if (front) {
                    front.style.display = 'block'
                }
                if (back) {
                    back.style.display = 'none'
                }
            } else {
                if (front) {
                    front.style.display = 'none'
                }
                if (back) {
                    back.style.display = 'flex'
                }
            }
        })

        const remainingTime = levelTimes[selectedLevel] - savedProgress.elapsedTime
        if (timerEl) {
            timerEl.textContent = `Осталось: ${remainingTime} сек`
        }
        startTimer(remainingTime, elapsed => {
            gameState.elapsedTime = savedProgress.elapsedTime + elapsed
            saveGameProgress({ selectedLevel, gameState, cardsData })
        })
    }

    if (showPreview) {
        const cardsContainer = document.getElementById('cards-container')
        if (cardsContainer) {
            cardsContainer.style.pointerEvents = 'none'
        }

        cardsData.forEach((_, index) => {
            const front = document.getElementById(`card-${index}-front`)
            const back = document.getElementById(`card-${index}-back`)
            if (front) {
                front.style.display = 'block'
            }
            if (back) {
                back.style.display = 'none'
            }
        })

        const previewInterval = setInterval(() => {
            if (timerEl) {
                timerEl.textContent = `Запоминай: ${previewTime}`
            }
            previewTime--
            if (previewTime < 0) {
                clearInterval(previewInterval)

                if (cardsContainer) {
                    cardsContainer.style.pointerEvents = 'auto'
                }

                cardsData.forEach((_, index) => {
                    const front = document.getElementById(`card-${index}-front`)
                    const back = document.getElementById(`card-${index}-back`)
                    if (front) {
                        front.style.display = 'none'
                    }
                    if (back) {
                        back.style.display = 'flex'
                    }
                })
                startTimer(levelTimes[selectedLevel], elapsed => {
                    gameState.elapsedTime = elapsed
                    saveGameProgress({ selectedLevel, gameState, cardsData })
                })
            }
        }, 1000)
    }

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const cardElement = document.getElementById(cardId)
        if (!cardElement) {
            return
        }

        cardElement.addEventListener('click', () => {
            handleCardClick({
                id: cardId,
                image,
                flippedCards,
                gameState,
                cardCount,
                selectedLevel,
                onWin: onWinCallback,
            })
            saveGameProgress({ selectedLevel, gameState, cardsData })
        })
    })

    const endGame = () => {
        stopTimer()
        gamePageInstance?.loseGame?.()
    }

    document.getElementById('endGameBtn')?.addEventListener('click', endGame)
    document.getElementById('backBtn')?.addEventListener('click', endGame)
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseTimer()
    } else {
        resumeTimer()
    }
})

export function initApp() {
    const saved = restoreGameProgress()

    if (saved) {
        localStorage.setItem(selectedLevelLSKey, saved.selectedLevel)
        setPage('gamePage')
        return
    }

    const savedPage = localStorage.getItem(currentPageLSKey) || 'mainPage'
    setPage(savedPage)
}

initApp()
