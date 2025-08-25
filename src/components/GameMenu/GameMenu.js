import * as styles from './GameMenu.module.css'
console.log(styles)

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру', group: 'top' },
    { id: 'historyPage', text: 'История игр', group: 'top' },
    { id: 'settingsPage', text: 'Изучить инструкцию', group: 'bottom' },
]

export function GameMenu() {
    const topButtons = menuItems
        .filter(item => item.group === 'top')
        .map(item => `<button id="${item.id}" class="${styles.button}">${item.text}</button>`)
        .join('')

    const bottomButtons = menuItems
        .filter(item => item.group === 'bottom')
        .map(item => `<button id="${item.id}" class="${styles.button}">${item.text}</button>`)
        .join('')

    return `
        <div class="${styles.menu}">
            <h1 class="${styles.title}">Главное меню</h1>
            <div class="${styles.topButtons}">
                ${topButtons}
            </div>
            <div class="${styles.bottomButtons}">
                ${bottomButtons}
            </div>
        </div>
    `
}
