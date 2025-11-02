import { setPage } from '../../index.js'

let intervalId = null
let remainingTime = 0
let loseHandler = null
let totalTime = 0
let onTickCallback = null

export function startTimer(seconds, onTick = null) {
    clearInterval(intervalId)
    intervalId = null

    remainingTime = seconds
    totalTime = seconds
    onTickCallback = onTick
    updateTimer()

    intervalId = setInterval(() => {
        remainingTime--
        updateTimer()

        if (onTickCallback) {
            const elapsedTime = totalTime - remainingTime
            onTickCallback(elapsedTime)
        }

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
    onTickCallback = null
}

export function pauseTimer() {
    clearInterval(intervalId)
    intervalId = null
}

export function resumeTimer() {
    if (remainingTime > 0 && !intervalId) {
        startTimer(remainingTime, onTickCallback)
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
