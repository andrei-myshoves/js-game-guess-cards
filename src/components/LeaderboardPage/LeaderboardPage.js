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
      <style>
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          position: relative;
          animation: rotate 1s linear infinite;
        }
        .loader::before,
        .loader::after {
          content: "";
          box-sizing: border-box;
          position: absolute;
          inset: 0px;
          border-radius: 50%;
          border: 5px solid #FFF;
          animation: prixClipFix 2s linear infinite;
        }
        .loader::after {
          border-color: #FF3D00;
          animation: prixClipFix 2s linear infinite, rotate 0.5s linear infinite reverse;
          inset: 6px;
        }
        @keyframes rotate {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
        @keyframes prixClipFix {
          0% { clip-path: polygon(50% 50%,0 0,0 0,0 0,0 0,0 0) }
          25% { clip-path: polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0) }
          50% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%) }
          75% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%) }
          100% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0) }
        }
      </style>
      <span class="loader"></span>
      <div style="margin-top:10px; font-size:18px;">Загрузка таблицы...</div>
    </div>
  `)

    localStorage.setItem(currentPageLSKey, 'leaderboardPage')

    setTimeout(() => loadLeaderboard(container), 100)

    return container
}

async function loadLeaderboard(container) {
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
      <table border="1" style="width:90%; max-width:800px; text-align:left; border-collapse: collapse; margin-top:20px;">
        <thead style="background:#f5f5f5;">
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
        console.error('Ошибка загрузки таблицы:', error)
    }
}
