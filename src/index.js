import { GameMenu } from '../src/components/GameMenu/GameMenu.js'
import { PageBlock } from '../src/components/PageBlock/PageBlock.js'

function renderPage(page) {
    const root = document.getElementById('root')

    switch (page) {
        case 'main':
            GameMenu()
            break
        case 'historyPage':
            root.innerHTML = PageBlock('Здесь скоро будет история')
            break
        case 'gamePage':
            root.innerHTML = PageBlock('Тут будет игра')
            break
        case 'settingsPage':
            root.innerHTML = PageBlock('Инструкция')
            break
    }

    localStorage.setItem('currentPage', page)
}

window.setPage = page => {
    renderPage(page)
}

const savedPage = localStorage.getItem('currentPage') || 'main'
renderPage(savedPage)
