let matchTime = 5
let counter = matchTime

function addPoint(player, point) {
    const opponent = player === 'guest' ? 'home' : 'guest'
    const playerScore = document.querySelector(`#${player}-score`)
    const opponentScore = document.querySelector(`#${opponent}-score`)
    const updatedScore = parseInt(playerScore.textContent) + point
    playerScore.textContent = updatedScore
    if (updatedScore >= parseInt(opponentScore.textContent) && !playerScore.classList.contains('leader')) {
        playerScore.classList.add('leader')
        opponentScore.classList.remove('leader')
    }
}

function newGame() {
    document.querySelectorAll('button:not(#new-game)').forEach(button => button.removeAttribute('disabled'))
    document.querySelectorAll('.score').forEach(item => {
        item.textContent = 0
        item.classList.remove('leader', 'winner')
    })
    document.querySelectorAll('.fouls').forEach(item => item.textContent = 0)
    document.querySelector('#new-game').setAttribute('disabled', true)
    printMinutsFromSeconds(counter)
    const timer = setInterval(() => {
        if (counter > 0) {
            --counter
            printMinutsFromSeconds(counter)
        } else {
            stopMatch()
            clearInterval(timer)
        }
    }, 1000)
}

function stopMatch() {
    const homeScore = document.querySelector('#home-score').textContent
    const guestScore = document.querySelector('#guest-score').textContent
    document.querySelectorAll('button:not(#new-game)').forEach(button => button.setAttribute('disabled', true))
    let winner = homeScore > guestScore ? 'home' : (homeScore === guestScore ? 'even' : 'guest');
    if (winner === 'even') {
        document.querySelectorAll('.score').forEach(item => {
            item.classList.add('winner')
        })
    } else {
        document.querySelector(`#${winner}-score`).classList.add('winner')
    }
    document.querySelector('#new-game').removeAttribute('disabled')
}

function printMinutsFromSeconds(seconds) {
    const timer = document.querySelector('#timer p')
    let timeRemaining
    const minutsReamining = parseInt(seconds / 60)
    const secondsRemaining = seconds % 60;

    if (seconds % 60 === 0 && seconds - 60 >= 0) {
        timeRemaining = `${timerNumber(minutsReamining)}:00`
    } else if (seconds % 60 > 0 && seconds > 60) {
        timeRemaining = `${timerNumber(minutsReamining)}:${timerNumber(secondsRemaining)}`
    } else {
        timeRemaining = `00:${timerNumber(seconds)}`
    }
    timer.textContent = timeRemaining
}

function addFoul(player) {
    let playerFouls = document.querySelector(`#${player}-fouls`)
    playerFouls.textContent = parseInt(playerFouls.textContent) + 1

}

function addExtraTime() {
    counter += 15
    printMinutsFromSeconds(counter)
}

function timerNumber(num) {
    return ('0' + num).slice(-2)
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button:not(#new-game)').forEach(button => button.setAttribute('disabled', true))
})