import { Button } from '../Button/Button.js'
import { Card } from '../Card/Card.js'
import { htmlToElement } from '../../utils/htmlToELement.js'

export function GamePage() {
    const container = htmlToElement(`
        <div>
            <div id="timer">00:00</div>
            <div id="cards-container" class="cards-grid"></div>
        </div>
    `)

    const cardsContainer = container.querySelector('#cards-container')

    const endBtn = Button({
        id: 'endGameBtn',
        text: 'Завершить игру',
        onClick: () => {},
    })
    container.appendChild(endBtn)

    const images = [
        '/img/Air.png',
        '/img/Darkness.png',
        '/img/Earth.png',
        '/img/Fire.png',
        '/img/Light.png',
        '/img/Tree.png',
        '/img/Water.png',
    ]
    const cardsData = [...images, ...images].sort(() => Math.random() - 0.5)

    let flippedCards = []
    let matchedCount = 0

    cardsData.forEach((image, index) => {
        const card = Card(index, image, handleCardClick)
        cardsContainer.appendChild(card)
    })

    function handleCardClick(id, image, cardEl) {
        flippedCards.push({ id, image, cardEl })

        if (flippedCards.length === 2) {
            const [first, second] = flippedCards
            if (first.image === second.image) {
                matchedCount++
                flippedCards = []

                if (matchedCount === images.length) {
                    setTimeout(() => alert('Ты победил!'), 300)
                }
            } else {
                setTimeout(() => {
                    first.cardEl.classList.remove('flipped')
                    second.cardEl.classList.remove('flipped')
                    flippedCards = []
                }, 1000)
            }
        }
    }

    return container
}
