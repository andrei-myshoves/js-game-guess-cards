import * as styles from './GameMenu.module.css'
import { Button } from '../Button/Button'

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру' },
    { id: 'historyPage', text: 'История игр' },
    { id: 'settingsPage', text: 'Изучить инструкцию' },
]

export function GameMenu() {
    const Buttons = menuItems.map(item => Button(item)).join('')

    return `
        <div class="${styles.menu}">
            <h1 class="${styles.title}">Главное меню</h1>
            <div class="${styles.buttons}">
                ${Buttons}
            </div>
        </div>
    `
}
