import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './GameMenuHeader.module.css'

export function GameMenuHeader() {
    return htmlToElement(`
    <div class="${styles.header || ''}">
      <div id="timer-wrapper" class="${styles.timerWrapper || ''}">
        <div id="timer" class="${styles.timer || ''}">00:00</div>
      </div>

      <div class="${styles.progress || ''}">
        <div>Вы угадали: <span id="guessedCount">0</span></div>
        <div>Осталось угадать: <span id="remainingCount">0</span></div>
      </div>
    </div>
  `)
}
