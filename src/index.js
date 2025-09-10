import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import { GamePage } from './components/GamePage/GamePage.js'
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
        case 'main':
            renderMainMenu()
            break

        case 'historyPage':
            renderPageWithBack('Здесь скоро будет история', '', false, 'main')
            break

        case 'gamePage':
        case 'game-page-with-cards': {
            const level = localStorage.getItem('selectedLevel')

            if (level) {
                renderGamePage(level)
                startTimer(levelTimes[level])
                localStorage.removeItem('selectedLevel')
            } else {
                renderPageWithBack('Выберите сложность', GameSettingsMenu(), true, 'main')
            }
            break
        }

        case 'settingsPage':
            renderPageWithBack('Инструкция', 'Текст инструкции...', false, 'main')
            break

        default:
            console.warn(`Неизвестная страница: ${page}, возвращаемся в главное меню`)
            setPage('main')
            break
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

function renderPageWithBack(title, content, isSettingsMenu = false, backTarget = 'main') {
    const layout = Layout({ title, children: content, showBack: true })
    root.appendChild(layout)

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.addEventListener('click', () => setPage(backTarget))
    }

    if (isSettingsMenu) {
        const easyBtn = document.getElementById('easy')
        const mediumBtn = document.getElementById('medium')
        const hardBtn = document.getElementById('hard')

        easyBtn.addEventListener('click', () => {
            localStorage.setItem('selectedLevel', 'easy')
            setPage('gamePage')
        })
        mediumBtn.addEventListener('click', () => {
            localStorage.setItem('selectedLevel', 'medium')
            setPage('gamePage')
        })
        hardBtn.addEventListener('click', () => {
            localStorage.setItem('selectedLevel', 'hard')
            setPage('gamePage')
        })
    }
}

function renderGamePage(selectedLevel) {
    const layout = Layout({ title: 'Игра', children: GamePage(selectedLevel), showBack: true })
    root.appendChild(layout)

    const endBtn = document.getElementById('endGameBtn')
    if (endBtn) {
        endBtn.addEventListener('click', () => {
            stopTimer()
            setPage('main')
        })
    }

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            stopTimer()
            setPage('gamePage')
        })
    }

    if (localStorage.getItem('endTime')) {
        updateTimer()
        resumeTimer()
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseTimer()
    else resumeTimer()
})

const savedPage = localStorage.getItem('currentPage') || 'main'
setPage(savedPage)
