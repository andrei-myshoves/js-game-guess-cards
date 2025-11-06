import * as styles from './GameMenuSettings.module.css'
import { Button } from '@components/Button/Button'
import { htmlToElement } from '@utils/htmlToELement'

export const difficultyLevels = [
    { id: 'easy', text: 'Лёгкая', extraClass: styles.buttonEasy },
    { id: 'medium', text: 'Средняя', extraClass: styles.buttonMedium },
    { id: 'hard', text: 'Тяжёлая', extraClass: styles.buttonHard },
]

export function GameSettingsMenu() {
    const buttonsHTML = difficultyLevels.map(level => Button(level).outerHTML).join('')

    return htmlToElement(`
    <div class="${styles.menu}">
      <div class="${styles.buttons}">
        ${buttonsHTML}
      </div>
    </div>
  `)
}
