let timerInterval

export function startTimer(seconds) {
    const endTime = Date.now() + seconds * 1000
    localStorage.setItem('endTime', endTime)

    updateTimer()
    timerInterval = setInterval(updateTimer, 1000)
}

export function updateTimer() {
    const endTime = localStorage.getItem('endTime')
    if (!endTime) return

    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
    const secs = String(remaining % 60).padStart(2, '0')

    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.textContent = `${minutes}:${secs}`

    if (remaining <= 0) {
        clearInterval(timerInterval)
        alert('Время вышло!')
        localStorage.removeItem('endTime')
    }
}

export function stopTimer() {
    clearInterval(timerInterval)
    localStorage.removeItem('endTime')
}

export function resumeTimer() {
    clearInterval(timerInterval)
    timerInterval = setInterval(updateTimer, 1000)
}
