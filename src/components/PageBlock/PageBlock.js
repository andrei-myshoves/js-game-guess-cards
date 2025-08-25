import * as styles from './PageBlock.module.css'

export function PageBlock(title) {
    return `
    <div class="${styles.page}">
      <h2>${title}</h2>
      <button id="backBtn" class="${styles.button}">Назад</button>
    </div>
  `
}
