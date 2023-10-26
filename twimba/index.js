import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetsDataCurrent = JSON.parse(localStorage.getItem('tweetsData')) ?? tweetsData

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    } else if (e.target.dataset.sendReply) {
        handleSendReplyClick(e.target.dataset.sendReply)
    } else if (e.target.classList.contains('modal-overlay')) {
        handleCloseModal()
    } else if (e.target.dataset.replyTweet) {
        handleReplyBtnClick(e.target.dataset.replyTweet)
    } else if(e.target.id == 'close-modal'){
        handleCloseModal()
    } else if(e.target.id == 'delete-tweet'){
        handleDeleteTweetClick(e.target.dataset.delete)
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = getTweetById(tweetId)
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    updateTweetsData()
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = getTweetById(tweetId)

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    updateTweetsData()
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')
    if (tweetInput.value) {
        tweetsDataCurrent.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        updateTweetsData()
        render()
        tweetInput.value = ""
    }

}

function handleSendReplyClick(tweetId) {

    const tweet = getTweetById(tweetId)
    let modalOverlayDiv = document.createElement('div')
    modalOverlayDiv.classList.add('modal-overlay')
    let modalDiv = document.createElement('div')
    modalDiv.classList.add('modal-reply')
    let modalInnerDiv = document.createElement('div')
    modalInnerDiv.classList.add('modal-reply-inner')
    modalInnerDiv.innerHTML = `
    <button id="close-modal">x</button>
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
        </div>            
    </div>
    <div class="tweet-input-area">
        <img src="images/scrimbalogo.png" class="profile-pic">
        <textarea placeholder="Leave a reply" id="reply-input"></textarea>
    </div>
    <button id="reply-btn" data-reply-tweet=${tweet.uuid}>Reply</button>`
    modalDiv.append(modalInnerDiv)
    document.body.append(modalOverlayDiv)
    document.body.append(modalDiv)
}

function handleCloseModal(targetDiv) {
    document.querySelector('.modal-overlay').remove()
    document.querySelector('.modal-reply').remove()
}

function handleReplyBtnClick(tweetId) {

    const replyInput = document.getElementById('reply-input')

    if (replyInput.value) {
        const tweet = getTweetById(tweetId)
        tweet.replies.push({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: replyInput.value,
        })
        updateTweetsData()
        render()
        handleCloseModal()
    }
}

function handleDeleteTweetClick(tweetId){
    const tweetToDelete = tweetsDataCurrent.findIndex(function (tweet) {
        return tweet.uuid === tweetId
    })

    tweetsDataCurrent.splice(tweetToDelete, 1)

    updateTweetsData()
    render()
}

function getTweetById(tweetId) {
    return tweetsDataCurrent.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
}

function updateTweetsData() {
    localStorage.setItem('tweetsData', JSON.stringify(tweetsDataCurrent))
}

function getTweetHtml(tweet, isReply) {
    let repliesHtml = ''
    let likeIconClass = ''
    let retweetIconClass = ''
    let tweetDetails = ''
    let tweetReplies = ''
    let deleteIcon = ''
    if (!isReply) {
        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                    <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                    `
            })
        }

        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        if (tweet.handle === '@Scrimba'){
            deleteIcon = `<button id="delete-tweet" data-delete="${tweet.uuid}">x</button>`
        }

        tweetDetails =
            `<div class="tweet-details">
            <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots"
                data-reply="${tweet.uuid}"
                ></i>
                ${tweet.replies.length}
            </span>
            <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}"
                data-like="${tweet.uuid}"
                ></i>
                ${tweet.likes}
            </span>
            <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}"
                data-retweet="${tweet.uuid}"
                ></i>
                ${tweet.retweets}
            </span>
            <span class="tweet-detail">
                <i class="fa-solid fa-reply reply-tweet"
                data-send-reply="${tweet.uuid}"
                ></i>
            </span>
            ${deleteIcon}
        </div>`

        tweetReplies = `<div class="hidden" id="replies-${tweet.uuid}">${repliesHtml}</div>`

    }

    return `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            ${tweetDetails}
        </div>            
    </div>
        ${tweetReplies}
</div>`
}

function getFeedHtml() {
    let feedHtml = ``
    tweetsDataCurrent.forEach(function (tweet) {

        feedHtml += getTweetHtml(tweet, false)

    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

