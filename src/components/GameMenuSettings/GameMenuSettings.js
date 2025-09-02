import * as styles from './GameMenuSettings.module.css'
import { Button } from '../Button/Button.js'

export const difficultyLevels = [
    { id: 'easy', text: 'Лёгкая', extraClass: styles.buttonEasy },
    { id: 'medium', text: 'Средняя', extraClass: styles.buttonMedium },
    { id: 'hard', text: 'Тяжёлая', extraClass: styles.buttonHard },
]

export function GameSettingsMenu() {
    const container = document.createElement('div')
    container.className = styles.menu

    const buttonsWrapper = document.createElement('div')
    buttonsWrapper.className = styles.buttons

    difficultyLevels.forEach(level => {
        const btn = Button({ id: level.id, text: level.text, extraClass: level.extraClass })
        buttonsWrapper.appendChild(btn)
    })

    container.appendChild(buttonsWrapper)
    return container
}
