import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { PageBlock } from './components/PageBlock/PageBlock.js'

const root = document.getElementById('root')

export function setPage(page) {
    switch (page) {
        case 'main':
            renderMainMenu()
            break

        case 'historyPage':
            renderPageWithBack('Здесь скоро будет история')
            break

        case 'gamePage':
            renderPageWithBack('Игра пока в разработке')
            break

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
    root.innerHTML = PageBlock(title)
    const backBtn = document.getElementById('backBtn')
    if (backBtn) {
        backBtn.onclick = () => {
            setPage('main')
        }
    }
}

const savedPage = localStorage.getItem('currentPage') || 'main'
setPage(savedPage)
