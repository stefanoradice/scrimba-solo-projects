import { posts } from './posts.js'

const mainMenu = document.querySelector('#main-menu')
const postsList = document.querySelector('#posts-list')
const viewMoreBtn = document.querySelector('#view-more-btn')
let startPagination,
    endPagination

document.addEventListener('click', function (e) {
    if (e.target.parentElement.id === 'menu-toggle') {
        mainMenu.classList.toggle('show')
    } else if (e.target.id === 'view-more-btn') {
        e.preventDefault()
        fetchPosts(3)
    }
})
document.addEventListener('DOMContentLoaded', () => fetchPosts())


const fetchPosts = (nextPosts = 0) => {
    if (postsList) {
        startPagination = nextPosts ? endPagination : 0
        endPagination = nextPosts ? endPagination + nextPosts : 3
        const postsPaginated = posts.slice(startPagination, endPagination)
        const postItems = postsPaginated.map(post => {
            const { title, excerpt, image, date } = post
            const article = document.createElement('article')
            const postDate = new Date(date);
            const dateFormat = `${postDate.toLocaleString('en-US', { month: 'short' })} ${postDate.getDate()}, ${postDate.getFullYear()}`;
            article.innerHTML = `
                <img class="post-image" src="images/${image}">
                <time datetime="${date}" class="post-date">${dateFormat}</time>
                <h3 class="post-title">${title}</h3>
                <p class="post-excerpt">${excerpt}</p>`
            postsList.insertBefore(article, viewMoreBtn)
        })

        if (posts.length <= endPagination){
            viewMoreBtn.remove()
        }
    }
}

