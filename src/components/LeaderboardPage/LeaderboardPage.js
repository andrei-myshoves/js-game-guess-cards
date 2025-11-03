import { Layout } from '../Layout/Layout.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './LeaderboardPage.module.css'

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeStats() {
    const games = {
        easy: randInt(10, 59),
        medium: randInt(5, 44),
        hard: randInt(1, 30),
    }
    const wins = {
        easy: randInt(0, games.easy),
        medium: randInt(0, games.medium),
        hard: randInt(0, games.hard),
    }
    const score = wins.easy * 1 + wins.medium * 2 + wins.hard * 3
    return { games, wins, score }
}

function buildTableHtml(leaderboard) {
    const rows = leaderboard
        .map(
            (item, idx) => `
      <tr class="${styles.row}">
        <td class="${styles.cell}">${idx + 1}</td>
        <td class="${styles.cell}">${item.name}</td>
        <td class="${styles.cell}">${item.wins.easy}/${item.games.easy}</td>
        <td class="${styles.cell}">${item.wins.medium}/${item.games.medium}</td>
        <td class="${styles.cell}">${item.wins.hard}/${item.games.hard}</td>
        <td class="${styles.cell}">${item.score}</td>
      </tr>`
        )
        .join('')

    return `
    <table class="${styles.table}">
      <thead>
        <tr>
          <th class="${styles.header}">#</th>
          <th class="${styles.header}">Имя</th>
          <th class="${styles.header}">Лёгкий (В/И)</th>
          <th class="${styles.header}">Средний (В/И)</th>
          <th class="${styles.header}">Тяжёлый (В/И)</th>
          <th class="${styles.header}">Очки</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

export function LeaderboardPage() {
    const content = htmlToElement(`
    <div class="${styles.container}">
      <div class="${styles.loaderWrapper}">
        <div class="${styles.loader}"></div>
      </div>
      <p class="${styles.loadingText}">Загрузка таблицы...</p>
    </div>
  `)

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        })
        .then(users => {
            console.log(users)

            const leaderboard = users
                .map(u => {
                    const s = makeStats()
                    return {
                        id: u.id,
                        name: u.name,
                        games: s.games,
                        wins: s.wins,
                        score: s.score,
                    }
                })
                .sort((a, b) => b.score - a.score)

            const tableHtml = buildTableHtml(leaderboard)
            const tableElement = htmlToElement(tableHtml)

            content.innerHTML = ''
            content.appendChild(tableElement)
        })
        .catch(err => {
            console.error('Leaderboard fetch error:', err)
            content.innerHTML = `<p class="${styles.error}">Ошибка при загрузке таблицы лидеров</p>`
        })

    return Layout({
        title: 'Таблица лидеров',
        children: content,
        showBack: true,
    })
}
