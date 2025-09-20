import { setPage } from '../../index.js'

let intervalId
let remainingTime
let loseHandler = null

export function startTimer(seconds) {
    remainingTime = seconds
    updateTimer()

    intervalId = setInterval(() => {
        remainingTime--
        updateTimer()

        if (remainingTime <= 0) {
            clearInterval(intervalId)
            if (loseHandler) {
                loseHandler()
            } else {
                alert('Время вышло! Вы проиграли.')
                setPage('mainPage')
            }
        }
    }, 1000)
}

export function stopTimer() {
    clearInterval(intervalId)
}

export function pauseTimer() {
    clearInterval(intervalId)
}

export function resumeTimer() {
    if (remainingTime > 0) {
        startTimer(remainingTime)
    }
}

export function updateTimer() {
    const timerEl = document.getElementById('timer')
    if (timerEl) {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
}

export function setLoseHandler(fn) {
    loseHandler = fn
}
