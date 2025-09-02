import * as styles from './GameMenu.module.css'
import { Button } from '../Button/Button.js'

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру', extraClass: styles.buttonStart },
    { id: 'historyPage', text: 'История игр', extraClass: styles.buttonHistory },
    { id: 'settingsPage', text: 'Изучить инструкцию', extraClass: styles.buttonInstruction },
]

export function GameMenu() {
    const container = document.createElement('div')
    container.className = styles.menu

    const title = document.createElement('h1')
    title.className = styles.title
    title.textContent = 'Главное меню'
    container.appendChild(title)

    const buttonsWrapper = document.createElement('div')
    buttonsWrapper.className = styles.buttons

    menuItems.forEach(item => {
        const btn = Button({ id: item.id, text: item.text, extraClass: item.extraClass })
        buttonsWrapper.appendChild(btn)
    })

    container.appendChild(buttonsWrapper)
    return container
}
