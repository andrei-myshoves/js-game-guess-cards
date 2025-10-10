import * as styles from './HistoryGame.module.css'
import { Layout } from '../Layout/Layout.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import { setPage } from '../../index.js'

export function HistoryGame() {
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

    const content = `
        <div class="${styles.historyContainer}">
            <div class="${styles.headerButtons}">
                <button id="repeatGameBtn" class="${styles.btnRepeat}">Повторить игру</button>
            </div>
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
            <button id="clearHistoryBtn" class="${styles.btnClear}">Очистить историю</button>
        </div>
    `

    const layout = Layout({
        title: 'История игр',
        children: htmlToElement(content),
        showBack: true,
    })

    setTimeout(() => {
        const backBtn = document.getElementById('backBtn')
        if (backBtn) {
            backBtn.addEventListener('click', () => setPage('mainPage'))
        }

        const clearBtn = document.getElementById('clearHistoryBtn')
        if (clearBtn) {
            clearBtn.addEventListener('click', () => alert('Очистка истории (пока тест)'))
        }

        const repeatBtn = document.getElementById('repeatGameBtn')
        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => {
                setPage('gamePage')
            })
        }
    }, 0)

    return layout
}

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
