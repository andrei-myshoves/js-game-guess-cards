import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import { GamePage, handleCardClick } from './components/GamePage/GamePage.js'
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

            const backBtn = document.getElementById('backBtn')
            if (backBtn) {
                backBtn.addEventListener('click', () => setPage('mainPage'))
            }

            const clearBtn = document.getElementById('clearHistoryBtn')
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    localStorage.removeItem(gameHistoryLSKey)
                    setPage('historyPage')
                })
            }

            const startBtn = document.getElementById('startGameBtn')
            if (startBtn) {
                startBtn.addEventListener('click', () => setPage('gamePage'))
            }

            const repeatBtn = document.getElementById('repeatGameBtn')
            if (repeatBtn) {
                repeatBtn.addEventListener('click', () => setPage('gamePage'))
            }

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

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.addEventListener('click', () => setPage(pageName))
    }

    if (isSettingsMenu) {
        const easyBtn = document.getElementById('easy')
        const mediumBtn = document.getElementById('medium')
        const hardBtn = document.getElementById('hard')

        if (easyBtn) {
            easyBtn.addEventListener('click', () => {
                localStorage.setItem(selectedLevelLSKey, 'easy')
                setPage('gamePage')
            })
        }
        if (mediumBtn) {
            mediumBtn.addEventListener('click', () => {
                localStorage.setItem(selectedLevelLSKey, 'medium')
                setPage('gamePage')
            })
        }
        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                localStorage.setItem(selectedLevelLSKey, 'hard')
                setPage('gamePage')
            })
        }
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

    const gamePageInstance = GamePage({
        selectedLevel,
        onWinCallback,
        onLoseCallback,
    })

    const { container, cardsData, cardCount, gameState } = gamePageInstance

    const layout = Layout({
        title: 'Игра',
        children: container,
        showBack: true,
    })
    root.appendChild(layout)

    const endBtn = Button({
        id: 'endGameBtn',
        text: 'Завершить игру',
    })
    const childrenContainer = document.getElementById('childrenContainer')
    if (childrenContainer) {
        childrenContainer.appendChild(endBtn)
    }

    const guessedEl = document.getElementById('guessedCount')
    const remainingEl = document.getElementById('remainingCount')
    if (guessedEl) {
        guessedEl.textContent = '0'
    }
    if (remainingEl) {
        remainingEl.textContent = String(cardCount / 2)
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

    let previewTime = 5
    const timerEl = document.getElementById('timer')
    const previewInterval = setInterval(() => {
        if (timerEl) {
            timerEl.textContent = `Запоминай: ${previewTime}`
        }
        previewTime--
        if (previewTime < 0) {
            clearInterval(previewInterval)

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

            startTimer(levelTimes[selectedLevel])
        }
    }, 1000)

    cardsData.forEach((image, index) => {
        const cardId = `card-${index}`
        const cardElement = document.getElementById(cardId)
        if (!cardElement) {
            return
        }
        cardElement.addEventListener('click', () =>
            handleCardClick({
                id: cardId,
                image,
                flippedCards,
                gameState,
                cardCount,
                selectedLevel,
                onWin: onWinCallback,
            })
        )
    })

    const endGame = () => {
        stopTimer()
        clearInterval(previewInterval)
        if (gamePageInstance?.loseGame) {
            gamePageInstance.loseGame()
        }
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

const savedPage = localStorage.getItem(currentPageLSKey) || 'mainPage'
setPage(savedPage)
