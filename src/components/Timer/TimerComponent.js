import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './TimerComponent.module.css'

export function TimerComponent() {
    return htmlToElement(`
    <div id="timer" class="${styles.timer}">00:00</div>
  `)
}
