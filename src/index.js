import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import { Button } from './components/Button/Button.js'
import './style.css'

const root = document.getElementById('root')

export function setPage(page) {
    switch (page) {
        case 'main':
            renderMainMenu()
            break

        case 'historyPage':
            renderPageWithBack('Здесь скоро будет история')
            break

        case 'gamePage': {
            const backBtnHTML = Button({ id: 'backBtn', text: 'Назад' })

            root.innerHTML = ''
            root.appendChild(
                Layout({
                    children: GameSettingsMenu() + backBtnHTML,
                })
            )

            const backBtn = document.getElementById('backBtn')
            if (backBtn) {
                backBtn.onclick = () => setPage('main')
            }
            break
        }

        case 'settingsPage':
            renderPageWithBack('Инструкция')
            break
    }

    localStorage.setItem('currentPage', page)
}

function renderMainMenu() {
    root.innerHTML = GameMenu()

    menuItems.forEach(item => {
        const btn = document.getElementById(item.id)
        if (btn) {
            btn.addEventListener('click', () => {
                setPage(item.id)
            })
        }
    })
}

function renderPageWithBack(title) {
    const backBtnHTML = Button({ id: 'backBtn', text: 'Назад' })

    root.innerHTML = ''
    root.appendChild(
        Layout({
            title,
            children: backBtnHTML,
        })
    )

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.onclick = () => setPage('main')
    }
}

const savedPage = localStorage.getItem('currentPage') || 'main'
setPage(savedPage)
