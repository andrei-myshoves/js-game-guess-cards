import { Button } from '../Button/Button.js'
import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as styles from './GamePage.module.css'

const images = [
    '/img/Air.png',
    '/img/Darkness.png',
    '/img/Earth.png',
    '/img/Fire.png',
    '/img/Light.png',
    '/img/Tree.png',
    '/img/Water.png',
]

const levels = {
    easy: 6,
    medium: 10,
    hard: 16,
}

export function GamePage(selectedLevel = 'easy') {
    const container = htmlToElement(`
    <div>
      <div id="timer">00:00</div>
      <div id="cards-container" class="${styles.cardsGrid}"></div>
    </div>
  `)

    const cardsContainer = container.querySelector('#cards-container')

    const endBtn = Button({
        id: 'endGameBtn',
        text: 'Завершить игру',
        extraClass: '',
    })
    container.appendChild(endBtn)

    const cardCount = levels[selectedLevel]
    const selectedImages = [...images].slice(0, Math.ceil(cardCount / 2))
    const cardsData = [...selectedImages, ...selectedImages].slice(0, cardCount).sort(() => Math.random() - 0.5)

    let flippedCards = []
    let matchedCount = 0

    cardsData.forEach((image, index) => {
        const card = Card(index, image, handleCardClick)
        cardsContainer.appendChild(card)
    })

    function handleCardClick(id, image, cardEl) {
        if (flippedCards.find(c => c.id === id)) return

        flippedCards.push({ id, image, cardEl })
        cardEl.classList.add('selected')

        if (flippedCards.length === 2) {
            const [first, second] = flippedCards
            if (first.image === second.image) {
                matchedCount++
                flippedCards = []

                if (matchedCount === selectedImages.length) {
                    setTimeout(() => alert('Ты победил! 🎉'), 300)
                }
            } else {
                setTimeout(() => {
                    first.cardEl.classList.remove('selected')
                    second.cardEl.classList.remove('selected')
                    flippedCards = []
                }, 1000)
            }
        }
    }

    return container
}
