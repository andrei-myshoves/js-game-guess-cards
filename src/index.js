import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import { GamePage, handleCardClick } from './components/GamePage/GamePage.js'
import { startTimer, stopTimer, pauseTimer, resumeTimer } from './components/Timer/Timer.js'
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
        case 'gamePage': {
            const level = localStorage.getItem('selectedLevel')
            if (level) {
                renderGamePage(level)
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
    const flippedCards = []
    const gameState = { matchedCount: 0, locked: false }

    const { container, selectedImages, cardsData } = GamePage(selectedLevel)

    const layout = Layout({
        title: 'Игра',
        children: container,
        showBack: true,
    })
    root.appendChild(layout)

    // показываем карты 5 секунд
    cardsData.forEach((_, index) => {
        const front = document.getElementById(`card-${index}-front`)
        const back = document.getElementById(`card-${index}-back`)
        if (front) front.style.display = 'block'
        if (back) back.style.display = 'none'
    })

    let previewTime = 5
    const timerEl = document.getElementById('timer')
    const previewInterval = setInterval(() => {
        timerEl.textContent = `Запоминай: ${previewTime}`
        previewTime--
        if (previewTime < 0) {
            clearInterval(previewInterval)
            // закрываем карты
            cardsData.forEach((_, index) => {
                const front = document.getElementById(`card-${index}-front`)
                const back = document.getElementById(`card-${index}-back`)
                if (front) front.style.display = 'none'
                if (back) back.style.display = 'flex'
            })
            // запускаем основной таймер
            startTimer(levelTimes[selectedLevel])
            // активируем клики
            cardsData.forEach((image, index) => {
                const cardId = `card-${index}`
                const cardElement = document.getElementById(cardId)
                if (!cardElement) return
                cardElement.addEventListener('click', () =>
                    handleCardClick({
                        id: cardId,
                        image,
                        flippedCards,
                        gameState,
                        selectedImages,
                        onWin: () => {
                            stopTimer()
                            alert('Вы победили!')
                            setPage('mainPage')
                        },
                    })
                )
            })
        }
    }, 1000)

    const endGame = () => {
        stopTimer()
        alert('Вы проиграли!')
        setPage('mainPage')
    }

    const endBtn = document.getElementById('endGameBtn')
    if (endBtn) endBtn.addEventListener('click', endGame)

    const backBtn = document.getElementById('backBtn')
    if (backBtn) backBtn.addEventListener('click', endGame)
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
