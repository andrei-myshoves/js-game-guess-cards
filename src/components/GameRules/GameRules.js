import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './GameRules.module.css'
import { levels } from '../GamePage/GamePage.js'
import { levelTimes } from '../../index.js'

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
    const container = htmlToElement(`<div class="${styles.container}"></div>`)

    const rulesList = htmlToElement(`<ul class="${styles.list}"></ul>`)
    rulesList.appendChild(RuleItem('🔍 Найдите все пары одинаковых карточек.'))
    rulesList.appendChild(RuleItem('⏳ Внимание: на каждую сложность даётся ограниченное время.'))
    rulesList.appendChild(
        RuleItem(
            '🃏 Перед началом игры все карточки показываются на 5 секунд — используйте это время, чтобы запомнить расположение.'
        )
    )
    rulesList.appendChild(RuleItem('⚡ Игра заканчивается победой, если вы нашли все пары до окончания таймера.'))
    rulesList.appendChild(RuleItem('💥 Если время истекло — игра завершается поражением.'))
    container.appendChild(rulesList)

    const diffTitle = htmlToElement(`<h3 class="${styles.subtitle}">Уровни сложности:</h3>`)
    container.appendChild(diffTitle)

    const difficultyList = htmlToElement(`<ul class="${styles.list}"></ul>`)
    difficultyList.appendChild(DifficultyItem('🥉 Лёгкий уровень', levels.easy, levelTimes.easy))
    difficultyList.appendChild(DifficultyItem('🥈 Средний уровень', levels.medium, levelTimes.medium))
    difficultyList.appendChild(DifficultyItem('🥇 Сложный уровень', levels.hard, levelTimes.hard))
    container.appendChild(difficultyList)

    return container
}
