import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import { GamePage, handleCardClick } from './components/GamePage/GamePage.js'
import { startTimer, updateTimer, stopTimer, pauseTimer, resumeTimer } from './components/Timer/Timer.js'
import './style.css'

const root = document.getElementById('root')

const levelTimes = {
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
            renderPageWithBack({
                title: 'Здесь скоро будет история',
                nextTitle: '',
                isSettingsMenu: false,
                pageName: 'mainPage',
            })
            break
        }

        case 'gamePage':
        case 'gamePageWithCards': {
            const level = localStorage.getItem('selectedLevel')

            if (level) {
                renderGamePage(level)
                startTimer(levelTimes[level])
                localStorage.removeItem('selectedLevel')
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
                nextTitle: 'Текст инструкции...',
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
    localStorage.setItem('currentPage', page)
}

function renderMainMenu() {
    const menu = GameMenu()
    root.appendChild(menu)

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
                localStorage.setItem('selectedLevel', 'easy')
                setPage('gamePage')
            })
        }

        if (mediumBtn) {
            mediumBtn.addEventListener('click', () => {
                localStorage.setItem('selectedLevel', 'medium')
                setPage('gamePage')
            })
        }

        if (hardBtn) {
            hardBtn.addEventListener('click', () => {
                localStorage.setItem('selectedLevel', 'hard')
                setPage('gamePage')
            })
        }
    }
}

function renderGamePage(selectedLevel) {
    let flippedCards = []
    const gameState = { matchedCount: 0 }

    const GamePageResult = GamePage(selectedLevel)
    const { container, selectedImages, cardsData } = GamePageResult

    const layout = Layout({
        title: 'Игра',
        children: container,
        showBack: true,
    })
    root.appendChild(layout)

    cardsData.forEach((image, index) => {
        const cardId = index + image
        const cardElement = document.getElementById(cardId)
        cardElement.addEventListener('click', () =>
            handleCardClick({ id: cardId, image, flippedCards, gameState, selectedImages })
        )
    })

    const endGame = () => {
        stopTimer()
        setPage('mainPage')
    }

    const endBtn = document.getElementById('endGameBtn')
    if (endBtn) {
        endBtn.addEventListener('click', endGame)
    }

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.addEventListener('click', endGame)
    }

    if (localStorage.getItem('endTime')) {
        updateTimer()
        resumeTimer()
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseTimer()
    } else {
        resumeTimer()
    }
})

const savedPage = localStorage.getItem('currentPage') || 'mainPage'
setPage(savedPage)
