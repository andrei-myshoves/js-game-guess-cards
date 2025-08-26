import * as styles from './GameMenu.module.css'
console.log(styles)

export const menuItems = [
    { id: 'gamePage', text: 'Начать игру' },
    { id: 'historyPage', text: 'История игр' },
    { id: 'settingsPage', text: 'Изучить инструкцию' },
]

export function GameMenu() {
    const Buttons = menuItems
        .map(item => `<button id="${item.id}" class="${styles.button}">${item.text}</button>`)
        .join('')

    return `
        <div class="${styles.menu}">
            <h1 class="${styles.title}">Главное меню</h1>
            <div class="${styles.Buttons}">
                ${Buttons}
            </div>
        </div>
    `
}
