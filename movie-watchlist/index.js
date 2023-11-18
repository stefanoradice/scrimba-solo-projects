const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')
const movieList = document.querySelector('#movie-list')
const watchlistList = document.querySelector('#watchlist-list')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchMovies(searchInput.value)
})

const fetchMovies = (searchText) => {
    console.log(searchText)
}