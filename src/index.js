import { GameMenu, menuItems } from './components/GameMenu/GameMenu.js'
import { PageBlock } from '../src/components/PageBlock/PageBlock.js'

function renderPage(page) {
    const root = document.getElementById('root')

    switch (page) {
        case 'main':
            root.innerHTML = GameMenu()
            menuItems.forEach(item => {
                const btn = document.getElementById(item.id)
                if (btn) btn.addEventListener('click', () => window.setPage(item.id))
            })
            break

        case 'historyPage': {
            root.innerHTML = PageBlock('Здесь скоро будет история')
            const backBtn = document.getElementById('backBtn')
            if (backBtn) backBtn.onclick = () => window.setPage('main')
            break
        }

        case 'gamePage': {
            root.innerHTML = PageBlock('Игра пока в разработке')
            const backBtn = document.getElementById('backBtn')
            if (backBtn) backBtn.onclick = () => window.setPage('main')
            break
        }

        case 'settingsPage': {
            root.innerHTML = PageBlock('Инструкция')
            const backBtn = document.getElementById('backBtn')
            if (backBtn) backBtn.onclick = () => window.setPage('main')
            break
        }
    }

    localStorage.setItem('currentPage', page)
}

window.setPage = renderPage
const savedPage = localStorage.getItem('currentPage') || 'main'
renderPage(savedPage)
