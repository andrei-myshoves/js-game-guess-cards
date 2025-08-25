import * as styles from './GameMenu.module.css'
console.log(styles)

const menuItems = [
    { id: 'gamePage', text: 'Начать игру' },
    { id: 'historyPage', text: 'История игр' },
    { id: 'settingsPage', text: 'Изучить инструкцию' },
]

export function GameMenu() {
    const html = `
    <div class="${styles.menu}">
      <h1 class="${styles.title}">Главное меню</h1>
      ${menuItems.map(item => `<button id="${item.id}" class="${styles.button}">${item.text}</button>`).join('')}
    </div>
  `

    const root = document.getElementById('root')
    root.innerHTML = html

    menuItems.forEach(item => {
        const btn = document.getElementById(item.id)
        btn.addEventListener('click', () => {
            window.setPage(item.id)
        })
    })
}
