const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];
let prevPasswordStatus = ''

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#generate-password').addEventListener('click', () => {
        const numbers = document.querySelector('#include-numbers').checked
        const symbols = document.querySelector('#include-symbols').checked
        const passwordBoxOne = document.querySelector('#password-1')
        const passwordBoxTwo = document.querySelector('#password-2')
        const passwordSecure = document.querySelector('#password-secure')
        const passwordLength = parseInt(document.querySelector('#password-length').value)
        let passwordOne = ''
        let passwordTwo = ''
        let secureLevel = ''
        let filteredCharacters = characters
        if (!numbers) {
            filteredCharacters = filteredCharacters.filter(item => isNaN(item))
        }
        if (!symbols) {
            var format = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];
            filteredCharacters = filteredCharacters.filter(item => !format.includes(item))
        }
        for (let i = 0; i < passwordLength; i++) {
            passwordOne += randomCharacter(filteredCharacters)
            passwordTwo += randomCharacter(filteredCharacters)
        }
        if (numbers && symbols & passwordLength >= 8) {
            secureLevel = 'strong'
        } else if (!numbers && !symbols && passwordLength <= 6) {
            secureLevel = 'weak'
        } else {
            secureLevel = 'medium'
        }

        passwordBoxOne.textContent = passwordOne
        passwordBoxTwo.textContent = passwordTwo
        passwordSecure.textContent = `Password ${secureLevel}`
        if (prevPasswordStatus) {
            passwordSecure.classList.remove(prevPasswordStatus)
        }
        passwordSecure.classList.add(secureLevel)
        prevPasswordStatus = secureLevel

        passwordBoxOne.addEventListener('click', copyPassword)
        passwordBoxTwo.addEventListener('click', copyPassword)
    })

})

function randomCharacter(characters) {
    let randomCharacter = Math.floor(Math.random() * characters.length)
    return characters[randomCharacter]
}

function copyPassword(el) {
    el.target.removeEventListener('click', copyPassword)
    let passwordText = el.target.textContent
    el.target.textContent = 'password copied!'
    navigator.clipboard.writeText(passwordText)
    setTimeout(() => {
        el.target.textContent = passwordText
        el.target.addEventListener('click', copyPassword)
    }, 1000)
}