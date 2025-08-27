import * as styles from './lay.module.css'
import { Button } from '../Button/Button'

export function PageBlock(title) {
    return `
        <div class="${styles.page}">
            <header class="${styles.header}">
                ${Button({ id: 'backBtn', text: 'Назад' })}
            </header>
            <h2>${title}</h2>
        </div>
    `
}
