import { Layout } from '@components/Layout/Layout'
import { Button } from '@components/Button/Button'
import { htmlToElement } from '@utils/htmlToELement'
import * as styles from './HistoryGame.module.css'
import { gameHistoryLSKey } from '@constants'

const difficultyLabels = {
    easy: 'Лёгкий',
    medium: 'Средний',
    hard: 'Тяжёлый',
}

export function HistoryGame() {
    const history = JSON.parse(localStorage.getItem(gameHistoryLSKey)) || []

    const content = htmlToElement(`<div class="${styles.historyContainer}"></div>`)
    const headerContainer = htmlToElement(`<div id="headerBtnsContainer" class="${styles.headerButtons}"></div>`)
    const footerContainer = htmlToElement(`<div id="footerBtnsContainer" class="${styles.footerButtons}"></div>`)

    content.appendChild(headerContainer)

    if (history.length === 0) {
        const emptyText = htmlToElement(
            `<p class="${styles.historyEmptyText}">История игр пуста. Сыграйте первую игру!</p>`
        )
        content.appendChild(emptyText)
        footerContainer.appendChild(
            Button({
                id: 'startGameBtn',
                text: 'Начать первую игру',
                extraClass: styles.btnStart,
            })
        )
    } else {
        const table = htmlToElement(`<table class="${styles.historyTable}"></table>`)
        const thead = htmlToElement(`
            <thead>
                <tr>
                    <th class="${styles.historyTableHeader}">Дата и время</th>
                    <th class="${styles.historyTableHeader}">Результат</th>
                    <th class="${styles.historyTableHeader}">Сложность</th>
                    <th class="${styles.historyTableHeader}">Время</th>
                </tr>
            </thead>
        `)
        const tbody = htmlToElement('<tbody></tbody>')

        history.forEach(item => {
            const difficultyText = difficultyLabels[item.difficulty] || item.difficulty
            const row = htmlToElement(`
                <tr>
                    <td class="${styles.historyTableCell}">${new Date(item.startedAt).toLocaleString()}</td>
                    <td class="${styles.historyTableCell} ${item.result === 'win' ? styles.resultWin : styles.resultLose}">
                        ${item.result === 'win' ? 'Победа' : 'Поражение'}
                    </td>
                    <td class="${styles.historyTableCell}">${difficultyText}</td>
                    <td class="${styles.historyTableCell}">
                        ${Math.floor(item.duration / 60)} мин ${item.duration % 60} сек
                    </td>
                </tr>
            `)
            tbody.appendChild(row)
        })

        table.appendChild(thead)
        table.appendChild(tbody)
        content.appendChild(table)

        headerContainer.appendChild(
            Button({
                id: 'repeatGameBtn',
                text: 'Повторить игру',
                extraClass: styles.btnRepeat,
            })
        )
        footerContainer.appendChild(
            Button({
                id: 'clearHistoryBtn',
                text: 'Очистить историю',
                extraClass: styles.btnClear,
            })
        )
    }

    content.appendChild(footerContainer)

    return Layout({
        title: 'История игр',
        children: content,
        showBack: true,
    })
}
