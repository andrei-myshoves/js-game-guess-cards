import * as styles from './GameMenuSettings.module.css'
import { Button } from '../Button/Button'

export const difficultyLevels = [
    { id: 'easy', text: 'Лёгкая', extraClass: styles.buttonEasy },
    { id: 'medium', text: 'Средняя', extraClass: styles.buttonMedium },
    { id: 'hard', text: 'Тяжёлая', extraClass: styles.buttonHard },
]

export function GameSettingsMenu() {
    const buttons = difficultyLevels
        .map(level => Button({ id: level.id, text: level.text, extraClass: level.extraClass }))
        .join('')

    return `
    <div class="${styles.menu}">
      <h1 class="${styles.title}">Выберите сложность</h1>
      <div class="${styles.buttons}">
        ${buttons}
      </div>
    </div>
  `
}
