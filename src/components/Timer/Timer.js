let timerInterval
let remainingTime = 0
let isPaused = false

export function startTimer(seconds) {
    remainingTime = seconds
    localStorage.setItem('remainingTime', remainingTime)
    isPaused = false

    updateTimer()
    clearInterval(timerInterval)
    timerInterval = setInterval(tick, 1000)
}

function tick() {
    if (isPaused) return

    remainingTime = parseInt(localStorage.getItem('remainingTime')) || 0

    if (remainingTime > 0) {
        remainingTime--
        localStorage.setItem('remainingTime', remainingTime)
    }

    updateTimer()

    if (remainingTime <= 0) {
        clearInterval(timerInterval)
        alert('Время вышло!')
        localStorage.removeItem('remainingTime')
    }
}

export function updateTimer() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0')
    const secs = String(remainingTime % 60).padStart(2, '0')

    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.textContent = `${minutes}:${secs}`
}

export function stopTimer() {
    clearInterval(timerInterval)
    localStorage.removeItem('remainingTime')
    remainingTime = 0
    updateTimer()
}

export function pauseTimer() {
    isPaused = true
    clearInterval(timerInterval)
}

export function resumeTimer() {
    if (remainingTime > 0) {
        isPaused = false
        clearInterval(timerInterval)
        timerInterval = setInterval(tick, 1000)
    }
}
