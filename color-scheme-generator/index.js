const startColor = document.querySelector('#start-color')
const modeColor = document.querySelector('#mode-color')
const resultsContainer = document.querySelector('#results')

document.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.id === 'get-colors') {
        console.log(startColor.value, modeColor.value)
        fetch(`https://www.thecolorapi.com/scheme?hex=${startColor.value.replace('#', '')}&&mode=${modeColor.value}&count=6`)
            .then(res => res.json())
            .then(data => renderScheme(data.colors))
            .catch(error => console.log(error))
    }
})

const renderScheme = (colors) => {
    resultsContainer.innerHTML = ''
    colors.map(color => {
        let hex = color.hex.value
        let colorDiv = document.createElement('div')
        let colorTextDiv = document.createElement('div')
        colorTextDiv.setAttribute('data-color', hex)
        colorTextDiv.classList.add('color-text')
        colorTextDiv.textContent = hex
        colorDiv.appendChild(colorTextDiv)
        colorDiv.setAttribute('class', 'result-color')
        colorDiv.setAttribute('id', hex)
        colorDiv.style.backgroundColor = hex
        resultsContainer.appendChild(colorDiv)
    }
    )
}