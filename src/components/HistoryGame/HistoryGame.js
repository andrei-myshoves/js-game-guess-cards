import { Layout } from '../Layout/Layout.js'
import { Button } from '../Button/Button.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './HistoryGame.module.css'
import { setPage } from '../../index.js'

export function HistoryGame({ onStartGame } = {}) {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || []

    let contentHTML

    if (history.length === 0) {
        contentHTML = `
      <div class="${styles.historyContainer}">
        <div id="headerBtnsContainer" class="${styles.headerButtons}"></div>
        <p class="${styles.historyEmptyText}">История игр пуста. Сыграйте первую игру!</p>
        <div id="footerBtnsContainer" class="${styles.footerButtons}"></div>
      </div>
    `
    } else {
        const rows = history
            .map(
                item => `
          <tr>
            <td>${new Date(item.startedAt).toLocaleString()}</td>
            <td class="${
                item.result === 'win' ? styles.resultWin : styles.resultLose
            }">${item.result === 'win' ? 'Победа' : 'Поражение'}</td>
            <td>${item.difficulty}</td>
            <td>${Math.floor(item.duration / 60)} мин ${item.duration % 60} сек</td>
          </tr>
        `
            )
            .join('')

        contentHTML = `
      <div class="${styles.historyContainer}">
        <div id="headerBtnsContainer" class="${styles.headerButtons}"></div>
        <table class="${styles.historyTable}">
          <thead>
            <tr>
              <th>Дата и время</th>
              <th>Результат</th>
              <th>Сложность</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div id="footerBtnsContainer" class="${styles.footerButtons}"></div>
      </div>
    `
    }

    const content = htmlToElement(contentHTML)

    const repeatBtn = Button({
        id: 'repeatGameBtn',
        text: 'Повторить игру',
        extraClass: styles.btnRepeat,
    })
    const clearBtn = Button({
        id: 'clearHistoryBtn',
        text: 'Очистить историю',
        extraClass: styles.btnClear,
    })
    const startBtn = Button({
        id: 'startGameBtn',
        text: 'Начать первую игру',
        extraClass: styles.btnStart,
    })

    const headerContainer = content.querySelector('#headerBtnsContainer')
    const footerContainer = content.querySelector('#footerBtnsContainer')

    if (history.length === 0) {
        footerContainer?.appendChild(startBtn)
    } else {
        headerContainer?.appendChild(repeatBtn)
        footerContainer?.appendChild(clearBtn)
    }

    const layout = Layout({
        title: 'История игр',
        children: content,
        showBack: true,
    })

    layout.querySelector('#backBtn')?.addEventListener('click', () => setPage('mainPage'))

    layout.querySelector('#clearHistoryBtn')?.addEventListener('click', () => {
        localStorage.removeItem('gameHistory')
        setPage('historyPage')
    })

    layout.querySelector('#startGameBtn')?.addEventListener('click', () => {
        if (onStartGame) {
            onStartGame()
        } else {
            setPage('gamePage')
        }
    })
    layout.querySelector('#repeatGameBtn')?.addEventListener('click', () => {
        if (onStartGame) {
            onStartGame()
        } else {
            setPage('gamePage')
        }
    })

    return layout
}
