import * as styles from './GameMenu.module.css'
import { Button } from '../Button/Button.js'
import { htmlToElement } from '../../utils/htmlToELement.js'

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру', extraClass: styles.buttonStart },
    { id: 'historyPage', text: 'История игр', extraClass: styles.buttonHistory },
    { id: 'leaderboardPage', text: 'Таблица лидеров', extraClass: styles.buttonLeaderboard },
    { id: 'settingsPage', text: 'Изучить инструкцию', extraClass: styles.buttonInstruction },
]

export function GameMenu() {
    const buttonsHTML = menuItems.map(item => Button(item).outerHTML).join('')

    return htmlToElement(`
    <div class="${styles.menu}">
      <h1 class="${styles.title}">Главное меню</h1>
      <div class="${styles.buttons}">
        ${buttonsHTML}
      </div>
    </div>
  `)
}
