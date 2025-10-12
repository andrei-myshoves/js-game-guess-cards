import { Layout } from '../Layout/Layout.js'
import { Button } from '../Button/Button.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './HistoryGame.module.css'
import { setPage } from '../../index.js'

const mockHistory = [
    {
        startedAt: '2025-10-10T14:12:00',
        result: 'win',
        difficulty: 'easy',
        duration: 82,
    },
    {
        startedAt: '2025-10-09T19:47:00',
        result: 'lose',
        difficulty: 'medium',
        duration: 114,
    },
    {
        startedAt: '2025-10-09T13:33:00',
        result: 'win',
        difficulty: 'hard',
        duration: 61,
    },
]

function formatDuration(seconds) {
    if (!seconds) {
        return '-'
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} мин ${secs} сек`
}

function formatDifficulty(level) {
    switch (level) {
        case 'easy':
            return 'Лёгкая'
        case 'medium':
            return 'Средняя'
        case 'hard':
            return 'Сложная'
        default:
            return '-'
    }
}

export function HistoryGame() {
    const rows = mockHistory
        .map(
            item => `
        <tr>
          <td>${new Date(item.startedAt).toLocaleString()}</td>
          <td class="${item.result === 'win' ? styles.resultWin : styles.resultLose}">
            ${item.result === 'win' ? 'Победа' : 'Поражение'}
          </td>
          <td>${formatDifficulty(item.difficulty)}</td>
          <td>${formatDuration(item.duration)}</td>
        </tr>`
        )
        .join('')

    const content = htmlToElement(`
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
  `)

    content.getElementById = function (id) {
        return this.querySelector(`#${id}`)
    }

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

    const headerContainer = content.getElementById('headerBtnsContainer')
    const footerContainer = content.getElementById('footerBtnsContainer')

    if (headerContainer) {
        headerContainer.appendChild(repeatBtn)
    }
    if (footerContainer) {
        footerContainer.appendChild(clearBtn)
    }

    const layout = Layout({
        title: 'История игр',
        children: content,
        showBack: true,
    })

    const backBtn = layout.getElementById('backBtn')
    const repeatGameBtn = layout.getElementById('repeatGameBtn')
    const clearHistoryBtn = layout.getElementById('clearHistoryBtn')

    if (backBtn) {
        backBtn.addEventListener('click', () => setPage('mainPage'))
    }

    if (repeatGameBtn) {
        repeatGameBtn.addEventListener('click', () => alert('Повторить последнюю игру'))
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => alert('Очистка истории (пока тест)'))
    }

    return layout
}
