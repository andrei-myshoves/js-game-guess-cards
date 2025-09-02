import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { GameSettingsMenu } from './components/GameMenuSettings/GameMenuSettings.js'
import { Layout } from './components/Layout/Layout.js'
import './style.css'

const root = document.getElementById('root')

export function setPage(page) {
    root.innerHTML = ''

    switch (page) {
        case 'main':
            renderMainMenu()
            break

        case 'historyPage':
            renderPageWithBack('Здесь скоро будет история', '')
            break

        case 'gamePage':
            renderPageWithBack('Выберите сложность', GameSettingsMenu())
            break

        case 'settingsPage':
            renderPageWithBack('Инструкция', 'Текст инструкции...')
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

function renderPageWithBack(title, content) {
    const layout = Layout({ title, children: content, showBack: true })
    root.appendChild(layout)

    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.addEventListener('click', () => setPage('main'))
    }
}

const savedPage = localStorage.getItem('currentPage') || 'main'
setPage(savedPage)
