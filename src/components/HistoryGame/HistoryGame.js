import { Layout } from '../Layout/Layout.js'
import { Button } from '../Button/Button.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './HistoryGame.module.css'
import { setPage } from '../../index.js'

function formatDuration(seconds) {
    if (!seconds) {
        return '-'
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} мин ${secs} сек`
}

//  Формат сложности
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
// eslint-disable-next-line no-unused-vars
function getHistory() {
    const data = localStorage.getItem('gameHistory')
    return data ? JSON.parse(data) : []
}

// eslint-disable-next-line no-unused-vars
function saveHistory(history) {
    localStorage.setItem('gameHistory', JSON.stringify(history))
}

export function HistoryGame() {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || []

    let contentHTML = ''

    if (history.length === 0) {
        contentHTML = `
      <div class="${styles['history-container']}">
        <div id="headerBtnsContainer" class="${styles['header-buttons']}"></div>
        <p class="${styles['history-empty-text']}">История игр пуста. Сыграйте первую игру!</p>
        <div id="footerBtnsContainer" class="${styles['footer-buttons']}"></div>
      </div>
    `
    } else {
        const rows = history
            .map(
                item => `
          <tr>
            <td>${new Date(item.startedAt).toLocaleString()}</td>
            <td class="${
                item.result === 'win' ? styles['result-win'] : styles['result-lose']
            }">${item.result === 'win' ? 'Победа' : 'Поражение'}</td>
            <td>${formatDifficulty(item.difficulty)}</td>
            <td>${formatDuration(item.duration)}</td>
          </tr>
        `
            )
            .join('')

        contentHTML = `
      <div class="${styles['history-container']}">
        <div id="headerBtnsContainer" class="${styles['header-buttons']}"></div>
        <table class="${styles['history-table']}">
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
        <div id="footerBtnsContainer" class="${styles['footer-buttons']}"></div>
      </div>
    `
    }

    const content = htmlToElement(contentHTML)

    content.getElementById = function (id) {
        return this.querySelector(`#${id}`)
    }

    // Создаём кнопки
    const repeatBtn = Button({
        id: 'repeatGameBtn',
        text: 'Повторить игру',
        extraClass: styles['btn-repeat'],
    })

    const clearBtn = Button({
        id: 'clearHistoryBtn',
        text: 'Очистить историю',
        extraClass: styles['btn-clear'],
    })

    const startBtn = Button({
        id: 'startGameBtn',
        text: 'Начать первую игру',
        extraClass: styles['btn-start'],
    })

    const headerContainer = content.getElementById('headerBtnsContainer')
    const footerContainer = content.getElementById('footerBtnsContainer')

    if (history.length === 0) {
        footerContainer.appendChild(startBtn)
    } else {
        headerContainer.appendChild(repeatBtn)
        footerContainer.appendChild(clearBtn)
    }

    const layout = Layout({
        title: 'История игр',
        children: content,
        showBack: true,
    })

    // Навешиваем обработчики
    const backBtn = layout.getElementById('backBtn')
    const repeatBtnEl = layout.getElementById('repeatGameBtn')
    const clearBtnEl = layout.getElementById('clearHistoryBtn')
    const startBtnEl = layout.getElementById('startGameBtn')

    if (backBtn) {
        backBtn.addEventListener('click', () => setPage('mainPage'))
    }

    if (repeatBtnEl) {
        repeatBtnEl.addEventListener('click', () => {
            const lastGame = history[history.length - 1]
            if (lastGame) {
                alert(`Повторяем последнюю игру (${formatDifficulty(lastGame.difficulty)})`)
                setPage('gamePage')
            }
        })
    }

    if (clearBtnEl) {
        clearBtnEl.addEventListener('click', () => {
            localStorage.removeItem('gameHistory')
            alert('История игр очищена')
            setPage('historyGame')
        })
    }

    if (startBtnEl) {
        startBtnEl.addEventListener('click', () => {
            setPage('gamePage')
        })
    }

    return layout
}
