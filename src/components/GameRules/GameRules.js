import { htmlToElement } from '@/utils/htmlToELement'
import * as styles from './GameRules.module.css'
import { levels } from '@/components/GamePage/GamePage'
import { levelTimes } from '@/index'

const rules = [
    '🔍 Найдите все пары одинаковых карточек.',
    '⏳ Внимание: на каждую сложность даётся ограниченное время.',
    '🃏 Перед началом игры все карточки показываются на 5 секунд — используйте это время, чтобы запомнить расположение.',
    '⚡ Игра заканчивается победой, если вы нашли все пары до окончания таймера.',
    '💥 Если время истекло — игра завершается поражением.',
]

const difficulties = [
    { label: '🥉 Лёгкий уровень', key: 'easy' },
    { label: '🥈 Средний уровень', key: 'medium' },
    { label: '🥇 Сложный уровень', key: 'hard' },
]

function RuleItem(text) {
    return htmlToElement(`<li>${text}</li>`)
}

function DifficultyItem(label, count, time) {
    return htmlToElement(`
    <li>
      <b>${label}</b> — ${count} карточек (${count / 2} пар), ⏱ ${time} секунд
    </li>
  `)
}

export function GameRules() {
    const container = htmlToElement(`
    <div class="${styles.container}">
      <ul id="rulesList" class="${styles.list}"></ul>
      <h3 class="${styles.subtitle}">Уровни сложности:</h3>
      <ul id="difficultyList" class="${styles.list}"></ul>
    </div>
  `)

    container.getElementById = function (id) {
        return this.querySelector(`#${id}`)
    }

    const rulesList = container.getElementById('rulesList')
    rules.forEach(rule => rulesList.appendChild(RuleItem(rule)))

    const difficultyList = container.getElementById('difficultyList')
    difficulties.forEach(diff => {
        const count = levels[diff.key]
        const time = levelTimes[diff.key]
        difficultyList.appendChild(DifficultyItem(diff.label, count, time))
    })

    return container
}
