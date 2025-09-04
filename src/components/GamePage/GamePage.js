import { Button } from '../Button/Button.js'

export function GamePage() {
    return `
    <div class="game">
      <h2>Текущая игра</h2>
      <div id="timer" class="timer">00:00</div>
      ${Button({ id: 'endGameBtn', text: 'Закончить игру' }).outerHTML}
    </div>
  `
}
