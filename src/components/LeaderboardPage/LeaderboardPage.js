import { htmlToElement } from '../../utils/htmlToELement.js'
import { currentPageLSKey } from '../../constants.js'

function getRandomStats() {
    const games = {
        easy: Math.floor(Math.random() * 20),
        medium: Math.floor(Math.random() * 15),
        hard: Math.floor(Math.random() * 10),
    }
    const wins = {
        easy: Math.floor(Math.random() * (games.easy + 1)),
        medium: Math.floor(Math.random() * (games.medium + 1)),
        hard: Math.floor(Math.random() * (games.hard + 1)),
    }
    const score = wins.easy * 1 + wins.medium * 2 + wins.hard * 3
    return { games, wins, score }
}

export async function LeaderboardPage() {
    const container = htmlToElement(`
        <div style="display:flex; flex-direction:column; align-items:center; margin-top:50px;">
            <div class="loader-inner ball-pulse"><div></div><div></div><div></div></div>
            <div>Загрузка таблицы...</div>
        </div>
    `)

    if (!document.getElementById('loaders-css')) {
        const link = document.createElement('link')
        link.id = 'loaders-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/loaders.css/0.1.2/loaders.min.css'
        document.head.appendChild(link)
    }

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await res.json()

        const leaderboard = users
            .map(user => {
                const stats = getRandomStats()
                return {
                    id: user.id,
                    name: user.name,
                    ...stats,
                }
            })
            .sort((a, b) => b.score - a.score)

        const table = htmlToElement(`
            <table border="1" style="width:100%; text-align:left; border-collapse: collapse; margin-top:20px;">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Легкий (В/И)</th>
                        <th>Средний (В/И)</th>
                        <th>Тяжелый (В/И)</th>
                        <th>Очки</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaderboard
                        .map(
                            (user, idx) => `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.wins.easy}/${user.games.easy}</td>
                            <td>${user.wins.medium}/${user.games.medium}</td>
                            <td>${user.wins.hard}/${user.games.hard}</td>
                            <td>${user.score}</td>
                        </tr>
                    `
                        )
                        .join('')}
                </tbody>
            </table>
        `)

        container.innerHTML = ''
        container.appendChild(table)
    } catch (error) {
        container.innerHTML = '<div>Ошибка при загрузке таблицы лидеров</div>'
        console.error(error)
    }

    localStorage.setItem(currentPageLSKey, 'leaderboardPage')

    return container
}
