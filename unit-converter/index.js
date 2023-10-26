/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const conversionUnit = ["length", "volume", "mass"]
const unit = document.querySelector('#unit')
const convert = document.querySelector('#convert')

convert.addEventListener('click', function () {

    let unitVal = unit.value
    let alert = document.querySelector('#alert')
    if (!unitVal || typeof parseFloat(unitVal) !== 'number') {
        if (!alert) {
            convert.insertAdjacentHTML('afterend', `<p id="alert" class="alert-message">please digit at least one number</p>`)
        }
    } else {

        if (alert) {
            alert.remove()
        }
    }

    for (let i = 0; i < conversionUnit.length; i++) {
        let error = false
        let calcOne = 0
        let calcTwo = 0
        switch (conversionUnit[i]) {
            case 'length':
                calcOne = (unitVal * 3.281).toFixed(3)
                calcTwo = (unitVal / 3.281).toFixed(3)
                unitOne = 'meters'
                unitTwo = 'feet'
                break;

            case 'volume':
                calcOne = (unitVal * 0.264).toFixed(3)
                calcTwo = (unitVal / 0.264).toFixed(3)
                unitOne = 'liters'
                unitTwo = 'gallons'
                break;

            case 'mass':
                calcOne = (unitVal * 2.204).toFixed(3)
                calcTwo = (unitVal / 2.204).toFixed(3)
                unitOne = 'kilos'
                unitTwo = 'pounds'
                break;

            default:
                error = true
                break;
        }

        document.querySelector(`#${conversionUnit[i]}`).textContent = error ? 'An error occured' : (!unitVal ? '' : `${unitVal} ${unitOne} = ${calcOne} ${unitTwo} | ${unitVal} ${unitTwo} = ${calcTwo} ${unitOne}`)

    }

})