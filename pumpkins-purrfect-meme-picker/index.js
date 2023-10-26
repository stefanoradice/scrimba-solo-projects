import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const overlayMemeModal = document.getElementById('meme-modal-overlay')
let currentCatImageObject = ''

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)
overlayMemeModal.addEventListener('click', closeModal)



getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e) {
    const checkboxes = document.getElementsByClassName('checkbox')
    if (e.target.checked) {
        e.target.parentElement.classList.add('highlight')
    } else {
        e.target.parentElement.classList.remove('highlight')
    }
}

function closeModal() {
    memeModal.style.display = 'none'
    overlayMemeModal.style.display = 'none'
}

function renderCat() {
    const catObject = getSingleCatObject()

    if (catObject && currentCatImageObject === catObject.catImg && !catObject.isSingle) {
        return renderCat()
    }

    currentCatImageObject = catObject.catImg

    if (typeof catObject.catImg !== 'undefined') {
        memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.catImg.image}"
        alt="${catObject.catImg.alt}"
        >
        `
        if (!catObject.isSingle) {

            memeModalInner.innerHTML += `<button id="change-image-btn" class="get-image-btn">load another image</button>`

            const changeImageBtn = document.getElementById('change-image-btn')
            changeImageBtn.addEventListener('click', renderCat)
        }

    } else {
        memeModalInner.innerHTML = `No results...`
    }
    memeModal.style.display = 'flex'
    overlayMemeModal.style.display = 'block'

}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (!catsArray.length) {
        return false
    } else if (catsArray.length === 1) {
        return {
            catImg: catsArray[0],
            isSingle: true
        }
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return {
            catImg: catsArray[randomNumber],
            isSingle: false
        }
    }
}

function getMatchingCatsArray() {
    const selectedChecboxes = document.querySelectorAll('.emotion-checkbox:checked')
    if (selectedChecboxes.length > 0) {
        const selectedEmotions = []
        const isGif = gifsOnlyOption.checked

        selectedChecboxes.forEach(item => selectedEmotions.push(item.id))

        const matchingCatsArray = catsData.filter(function (cat) {
            let verifyEmotionsMatch = selectedEmotions.every(emotion => cat.emotionTags.includes(emotion))

            if (isGif) {
                return verifyEmotionsMatch && cat.isGif
            }
            else {
                return verifyEmotionsMatch
            }
        })
        return matchingCatsArray
    }

}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsCheckboxes(cats) {

    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
        <div class="checkbox">
            <label for="${emotion}">${emotion}</label>
            <input
            type="checkbox"
            id="${emotion}"
            class="emotion-checkbox"
            value="${emotion}"
            name="emotions[]"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsCheckboxes(catsData)