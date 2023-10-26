const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postsList = document.querySelector('#posts-list')

function renderPostsList() {
    posts.forEach((post) => {
        renderPost(post)
    })
}

function renderPost(post) {

    let article = document.createElement('article')
    let header = document.createElement('header')
    let avatar = document.createElement('img')
    let info = document.createElement('div')
    let name = document.createElement('div')
    let location = document.createElement('div')
    let postImg = document.createElement('img')
    let footer = document.createElement('footer')
    let actions = document.createElement('div')
    let iconHeart = document.createElement('img')
    let iconComment = document.createElement('img')
    let iconDm = document.createElement('img')
    let likes = document.createElement('div')
    let commentsList = document.createElement('div')
    let commentsItem = document.createElement('div')
    let username = document.createElement('div')
    let comment = document.createElement('div')

    header.classList.add("article-header")
    avatar.classList.add("avatar")
    info.classList.add("info")
    name.classList.add("name")
    location.classList.add("location")
    postImg.classList.add("post")
    actions.classList.add("actions")
    iconHeart.classList.add("icon", "icon-heart")
    iconComment.classList.add("icon", "icon-comment")
    iconDm.classList.add("icon", "icon-dm")
    likes.classList.add("likes")
    commentsList.classList.add("comments-list")
    commentsItem.classList.add("comments-item")
    username.classList.add("username")
    comment.classList.add("comment")

    avatar.setAttribute("src", post.avatar)
    name.textContent = post.name
    location.textContent = post.location
    postImg.setAttribute("src", post.post)
    likes.textContent = `${post.likes} likes`
    username.textContent = post.username
    comment.textContent = post.comment
    iconHeart.setAttribute("src", "images/icon-heart.png")
    iconComment.setAttribute("src", "images/icon-comment.png")
    iconDm.setAttribute("src", "images/icon-dm.png")

    header.append(avatar, info)
    info.append(name, location)
    actions.append(iconHeart, iconComment, iconDm)

    commentsItem.append(username, comment)
    commentsList.append(commentsItem)
    footer.append(actions, likes, commentsList)
    article.append(header, postImg, footer)

    iconHeart.addEventListener('dblclick', () => {
        const prevLikes = JSON.parse(localStorage.getItem('likes')) ?? []
        if (!prevLikes.includes(post.username) || prevLikes.length === 0) {
            prevLikes.push(post.username)
            likes.textContent = `${++post.likes} likes`
            localStorage.setItem('likes', JSON.stringify(prevLikes))

        } else {
            result = prevLikes.filter(item => item !== post.username)
            likes.textContent = `${--post.likes} likes`
            localStorage.setItem('likes', JSON.stringify(result))
        }


    })

    postsList.append(article)

}

renderPostsList()