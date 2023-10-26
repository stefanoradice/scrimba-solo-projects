import { menuItems } from "./menu.js"

const mainDiv = document.querySelector('main')
const menuDiv = document.querySelector('#menu')
const modalOverlay = document.querySelector('#modal-overlay')
const checkoutModal = document.querySelector('#checkout-modal')
const checkoutForm = document.querySelector('#checkout-form')
const orderComplete = document.querySelector('#order-complete')
const orderReview = document.querySelector('#order-review')
const starsList = document.querySelectorAll('.fa-star')
let voted = false
const cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? []

document.addEventListener('DOMContentLoaded', () => {
    renderMenu()
    cartItems.length > 0 && renderCart()
})

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddBtnClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveBtnClick(e, e.target.dataset.remove, e.target)
    } else if (e.target.id === 'complete-order') {
        handleCompleteOrderClick()
    } else if (e.target.id === 'submit-payment') {
        handleSubmitPaymentClick(e)
    } else if (e.target.id === 'modal-overlay') {
        closeModal()
    } else if (e.target.dataset.rate) {
        handleRateBtnClick(e.target.dataset.rate)
    }
})

document.addEventListener('mouseover', (e) => {

    if (!voted) {
        if (e.target.dataset.rate) {

            for (let index = 0; index < starsList.length; index++) {
                if (index + 1 <= parseInt(e.target.dataset.rate)) {
                    starsList[index].classList.remove('fa-regular')
                    starsList[index].classList.add('fa-solid')
                } else {
                    starsList[index].classList.add('fa-regular')
                    starsList[index].classList.remove('fa-solid')
                }
            }
        } else {
            for (let index = 0; index < starsList.length; index++) {
                starsList[index].classList.remove('fa-solid')
                starsList[index].classList.add('fa-regular')
            }
        }
    }

})

const handleAddBtnClick = (itemId) => {
    updateCart(itemId)
}

const handleRemoveBtnClick = (e, itemId, cartItem) => {
    e.preventDefault()
    updateCart(itemId, 'remove', cartItem)
}

const handleCompleteOrderClick = () => {
    modalOverlay.style.display = 'flex'
    checkoutModal.style.display = 'flex'
}

const handleSubmitPaymentClick = (e) => {
    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity()
    } else {
        e.preventDefault()

        const cartDiv = document.querySelector('#cart')
        const formData = new FormData(checkoutForm)

        orderComplete.textContent = `Thanks, ${formData.get('fullname')}! Your order is on its way!`
        orderComplete.style.display = 'flex'
        orderReview.style.display = 'block'
        checkoutForm.reset()
        cartDiv.remove()
        closeModal()
        localStorage.removeItem('cartItems')
    }
}

const closeModal = () => {
    modalOverlay.style.display = 'none'
    checkoutModal.style.display = 'none'

}

const handleRateBtnClick = (rate) => {
    voted = true
    for (let index = 0; index < starsList.length; index++) {
        if (index + 1 <= parseInt(rate)) {
            starsList[index].classList.remove('fa-regular')
            starsList[index].classList.add('fa-solid')
        }
    }
    alert('thanks for your vote!')
}

const renderMenu = () => {

    let menuList = document.createElement('ul')
    menuList.classList.add('menu-list')
    menuDiv.append(menuList)

    menuItems.map(item => {
        let menuItem = document.createElement('li')
        menuItem.setAttribute('id', item.id)
        menuItem.classList.add('menu-item')
        menuItem.innerHTML = `
        <div class="menu-item-img">${item.image}</div>
        <div class="menu-item-details">
            <h3>${item.name}</h3>
            <p>${item.ingredients}</p>
            <span>$${item.price}</span>
        </div>
        <div class="menu-item-actions">
            <button data-add=${item.id} class="add">+</button>
        </div>`
        menuList.append(menuItem)
    })
}

const renderCart = () => {
    const cartDiv = document.createElement('div')
    cartDiv.setAttribute('id', 'cart')

    cartDiv.innerHTML = `
    <h4>Your order</h4>
    <ul id="cart-list">
    </ul>
    <div class="cart-total-discount" id="cart-discount">
        <h3>Meal Deal</h3>
        <span id="cart-total-discount"></span>
    </div>
    <div class="cart-total">
        <h3>Total price</h3>
        <span id="cart-total"></span>
    </div>
    <button id="complete-order">Complete order</button>`

    mainDiv.append(cartDiv)

    if (cartItems.length > 0) {
        cartItems.map(item => document.querySelector('#cart-list').append(renderCartItem(item)))
        calculateTotal()
    }

    if (orderComplete.style.display === 'flex') orderComplete.style.display = 'none'
}

const renderCartItem = (item) => {
    const cartItem = document.createElement('li')
    cartItem.classList.add('cart-item')
    cartItem.innerHTML =
        `<h3 class="cart-item-title">${item.name}</h3> 
    <a class="remove-item" href="#" data-remove=${item.id}>remove</a> 
    <span class="cart-item-price">$${item.price}</span>`

    return cartItem
}

const updateCart = (itemId, action = 'add', cartItem = null) => {
    const cartDiv = document.querySelector('#cart')
    const item = menuItems.filter(item => item.id === parseInt(itemId))[0]

    if (!cartDiv) renderCart()

    if (action === 'add') {
        cartItems.push(item)

        document.querySelector('#cart-list').append(renderCartItem(item))

    } else if (action === 'remove' && cartItem) {

        cartItem.parentElement.remove()

        cartItems.splice(cartItems.indexOf(item), 1)

        if (cartItems.length === 0) {
            cartDiv.remove()
        }

    } else {
        throw new Error('Error on handling action')
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    cartItems.length > 0 && calculateTotal()
}

const calculateTotal = () => {
    const cartTotal = document.querySelector('#cart-total')
    const cartDiscount = document.querySelector('#cart-discount')
    const cartDiscountTotal = document.querySelector('#cart-total-discount')

    const foodQty = cartItems.reduce((counter, item) => item.type === 'food' ? ++counter : counter, 0)
    const drinkQty = cartItems.reduce((counter, item) => item.type === 'drink' ? ++counter : counter, 0)
    let totDiscounts = 0

    if (foodQty > 0 && drinkQty > 0) {
        totDiscounts = (foodQty >= drinkQty ? drinkQty : foodQty) * 6
        cartDiscountTotal.textContent = `- $${totDiscounts}`
        cartDiscount.style.display = 'flex'
    }

    const total = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0,
    );

    cartTotal.textContent = `$${total - totDiscounts}`
}