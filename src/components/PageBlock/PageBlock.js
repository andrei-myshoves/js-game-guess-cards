import * as styles from './PageBlock.module.css'

export function PageBlock(title) {
    return `
    <div class="${styles.page}">
      <h2>${title}</h2>
      <button class="${styles.button}" onclick="setPage('main')">Назад</button>
    </div>
  `
}
