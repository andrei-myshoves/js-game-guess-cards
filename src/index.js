import { GameMenu } from './components/GameMenu/GameMenu.js'
import { PageBlock } from './components/PageBlock/PageBlock.js'

function renderPage(page) {
    const root = document.getElementById('root')
    switch (page) {
        case 'main':
            root.innerHTML = GameMenu()
            break
        case 'history':
            root.innerHTML = PageBlock('Здесь скоро будет история')
            break
        case 'block2':
            root.innerHTML = PageBlock('Содержимое блока 2')
            break
        case 'block3':
            root.innerHTML = PageBlock('Содержимое блока 3')
            break
    }
    localStorage.setItem('currentPage', page)
}

window.setPage = page => {
    renderPage(page)
}

const savedPage = localStorage.getItem('currentPage') || 'main'
renderPage(savedPage)
