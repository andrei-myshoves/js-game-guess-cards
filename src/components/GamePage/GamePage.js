import { Button } from '../Button/Button.js'
import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'
import * as pageStyles from './GamePage.module.css'
import * as cardStyles from '../Card/Card.module.css'

const images = [
    '/img/Air.webp',
    '/img/Darkness.webp',
    '/img/Earth.webp',
    '/img/Fire.webp',
    '/img/Light.webp',
    '/img/Tree.webp',
    '/img/Water.webp',
]

const levels = { easy: 6, medium: 10, hard: 16 }

export function GamePage(selectedLevel = 'easy') {
    const container = htmlToElement(`
    <div>
      <div id="timer">00:00</div>
      <div id="cards-container" class="${pageStyles.cardsGrid}"></div>
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

    function handleCardClick(id, image, cardEl, innerEl) {
        if (flippedCards.find(c => c.cardId === id)) {
            return
        }
        flippedCards.push({ cardId: id, image, cardEl, innerEl })

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
                    first.innerEl.style.display = 'none'
                    first.cardEl.querySelector(`.${cardStyles.back}`).style.display = 'block'

                    second.innerEl.style.display = 'none'
                    second.cardEl.querySelector(`.${cardStyles.back}`).style.display = 'block'

                    flippedCards = []
                }, 1000)
            }
        }
    }

    return container
}
