import { htmlToElement } from '../../utils/htmlToELement'

export function Card(id, image, onClick) {
    const card = htmlToElement(`
        <div class="card" id="card-${id}">
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${image}" alt="card" />
                </div>
            </div>
        </div>
    `)

    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped')
            onClick(id, image, card)
        }
    })

    return card
}
