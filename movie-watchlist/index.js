import { OMDb_api_key } from '../config.js'

const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')
const movieList = document.querySelector('#movie-list')
const watchlistList = document.querySelector('#watchlist-list')
let watchlistData = localStorage.getItem('watchlistData') === null ? [] : JSON.parse(localStorage.getItem('watchlistData'))



const renderWatchlist = async () => {
    if (watchlistData.length > 0) {
        const movies = await fetchAllDatas(watchlistData)
        watchlistList.innerHTML = ''
        watchlistList.innerHTML = renderMovieList(movies)
    }
}

const fetchData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}


const fetchAllDatas = async (data) => {
    return await Promise.all(data.map(async (movie) => {
        let imdbID = typeof movie.imdbID === 'undefined' ? movie : movie.imdbID
        movie = await fetchData(`http://www.omdbapi.com/?apikey=${OMDb_api_key}&i=${imdbID}`)
        return movie
    }))
}

const fetchFullMovies = async (searchText) => {
    const data = await fetchData(`http://www.omdbapi.com/?apikey=${OMDb_api_key}&s=${searchText}`)
    if (data.Search) {
        const movies = await fetchAllDatas(data.Search)
        movieList.innerHTML = renderMovieList(movies)
    } else {
        movieList.innerHTML = ''
        renderEmptyResult(movieList)
    }
}

const renderMovieList = (movies) => {
    let htmlRes = ''

    movies.forEach(movie => {

        const { Title, Runtime, Poster, Genre, Plot, Ratings, imdbID } = movie
        let buttonText = '<img src="images/plus-icon.svg"> Add to watchlist'
        let buttonClass = ''
        if (watchlistData.includes(imdbID)) {
            buttonText = watchlistList ? '<img src="images/minus-icon.svg"> Remove' : 'Added to watchlist'
            buttonClass = watchlistList ?? 'watched'
        }
        htmlRes += `
        <article class="movie">
        <img src="${Poster}" alt="${Title}" class="movie-image">
        <div class="movie-content">
            <div class="movie-header">
                <h2>${Title}</h2>
                <div class="movie-rating">
                    <img src="images/star-icon.svg"> ${Ratings[0].Value}
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-duration">
                    ${Runtime}
                </div>
                <div class="movie-categories">
                    ${Genre}
                </div>
                <button data-id="${imdbID}" class="movie-action ${buttonClass}">${buttonText}</button>
            </div>
            <div class="movie-excerpt">
            ${Plot}
            </div>
        </div>
    </article>`
    })
    return htmlRes
}

const renderEmptyResult = (context, text) => {
    if (!text) {
        if (watchlistList) {
            text = `Your watchlist is looking a little empty...
            <a href="index.html" class="add-movie"><img src="images/plus-icon.svg" class="add-icon">Let’s add
                some movies!</a>`
        } else {
            text = `Unable to find what you’re looking for. Please try another search.`
        }

    }
    context.innerHTML = `
    <div class="empty-result">
        ${text}
    </div>`
}

if (watchlistList) {
    renderWatchlist()
} else {

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        fetchFullMovies(searchInput.value)
    })
}

document.addEventListener('click', (e) => {
    const dataId = e.target.dataset.id
    if (dataId) {
        if (!watchlistList && !watchlistData.includes(dataId)) {
            watchlistData.push(dataId)
            localStorage.setItem('watchlistData', JSON.stringify(watchlistData))
            e.target.classList.add('watched')
            e.target.querySelector('img').remove
            e.target.textContent = 'added to watchlist'
        } else {
            const movieToRemove = watchlistData.indexOf(dataId)
            watchlistData.splice(movieToRemove, 1)
            localStorage.setItem('watchlistData', JSON.stringify(watchlistData))
            e.target.parentElement.parentElement.parentElement.remove()
            if (watchlistData.length <= 0) {
                renderEmptyResult(watchlistList)
            }
        }

    }
})