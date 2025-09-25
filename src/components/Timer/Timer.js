import { setPage } from '../../index.js'

let intervalId = null
let remainingTime = 0
let loseHandler = null

export function startTimer(seconds) {
    clearInterval(intervalId)
    intervalId = null

    remainingTime = seconds
    updateTimer()

    intervalId = setInterval(() => {
        remainingTime--
        updateTimer()

        if (remainingTime <= 0) {
            clearInterval(intervalId)
            intervalId = null
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
    intervalId = null
    remainingTime = 0
}

export function pauseTimer() {
    clearInterval(intervalId)
    intervalId = null
}

export function resumeTimer() {
    if (remainingTime > 0 && !intervalId) {
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
