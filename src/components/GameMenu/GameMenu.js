import styles from './GameMenu.module.css'
console.log(styles)

export function GameMenu() {
    return `
    <div class="${styles.menu}">
      <h1 class="${styles.title}">Главное меню</h1>
      <button class="${styles.button}" onclick="setPage('history')">История игр</button>
      <button class="${styles.button}" onclick="setPage('block2')">Начать игру</button>
      <button class="${styles.button}" onclick="setPage('block3')">Изучить инструкцию</button>
    </div>
  `
}
