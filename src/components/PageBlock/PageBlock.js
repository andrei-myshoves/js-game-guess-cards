import * as styles from './PageBlock.module.css'

export function PageBlock(title) {
    return `
    <div class="${styles.page}">
      <header class="${styles.header}">
        <button id="backBtn" class="${styles.button}">Назад</button>
        <h2>${title}</h2>
      </header>
      <div class="${styles.content}">
        <!-- Тут будет контент страницы -->
      </div>
    </div>
  `
}
