import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const messageEl = document.querySelector('#message-field')
const fromEl = document.querySelector('#from-field')
const toEl = document.querySelector('#to-field')
const publishBtn = document.querySelector('#publish-button')
const endorsementsList = document.querySelector('#endorsements-list')

const appSettings = {
    databaseURL: "https://realtime-database-d0cdb-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsements = ref(database, "endorsements")

publishBtn.addEventListener('click', function () {
    const endorsementsItem = {
        message: messageEl.value,
        from: fromEl.value,
        to: toEl.value
    }
    push(endorsements, endorsementsItem)
    clearFields()
})

onValue(endorsements, function (snapshot) {
    if (snapshot.exists()) {
        endorsementsList.textContent = ""
        let itemsArray = Object.entries(snapshot.val()).reverse()
        for (let i = 0; i < itemsArray.length; i++) {
            addItemToList(itemsArray[i])
        }

    }
})

function clearFields() {
    messageEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function addItemToList(item) {

    let itemId = item[0]
    let to = item[1]['to']
    let from = item[1]['from']
    let message = item[1]['message']
    let likes = item[1]['likes']

    let liEl = document.createElement('li')

    let toEl = document.createElement('div')
    toEl.classList.add('to')
    toEl.textContent = `To ${to}`

    let messageEl = document.createElement('div')
    messageEl.classList.add('message')
    messageEl.textContent = message

    let footerEl = document.createElement('div')
    footerEl.classList.add('footer')

    let fromEl = document.createElement('div')
    fromEl.classList.add('from')
    fromEl.textContent = `From ${from}`

    let likesEl = document.createElement('div')
    likesEl.classList.add('likes')
    likesEl.innerHTML = `&#9829; ${likes ?? 0}`

    footerEl.append(fromEl, likesEl)
    liEl.append(toEl, messageEl, footerEl)

    endorsementsList.append(liEl)

    likesEl.addEventListener('click', () => {
        let endorsementsRef = ref(database, `endorsements/${itemId}`)
        const prevLikes = JSON.parse(localStorage.getItem('likes')) ?? []

        if (!prevLikes.includes(itemId)) {
            prevLikes.push(itemId)
            localStorage.setItem('likes', JSON.stringify(prevLikes))
            set(endorsementsRef, {
                ...item[1],
                likes: likes ? likes + 1 : 1
            })
        }


    })
}