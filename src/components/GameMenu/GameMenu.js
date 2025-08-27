import * as styles from './GameMenu.module.css'
import { Button } from '../Button/Button'

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру', class: 'buttonStart' },
    { id: 'historyPage', text: 'История игр', class: 'buttonHistory' },
    { id: 'settingsPage', text: 'Изучить инструкцию', class: 'buttonInstruction' },
]

export function GameMenu() {
    const Buttons = menuItems.map(item => Button({ id: item.id, text: item.text, extraClass: item.class })).join('')

    return `
        <div class="${styles.menu}">
            <h1 class="${styles.title}">Главное меню</h1>
            <div class="${styles.buttons}">
                ${Buttons}
            </div>
        </div>
    `
}
