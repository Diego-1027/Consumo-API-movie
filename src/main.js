
const url = 'https://api.themoviedb.org/'
const API = axios.create({
    baseURL: 'https://api.themoviedb.org/',
    headers:{
        'Content-Type': 'application/json; charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    }
})

function createMovie(movies, container) {
    container.innerHTML=""

    movies.forEach(movie => {

        //crear contenedor de tarjeta
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-container")
        movieContainer.addEventListener("click",()=>{
            location.hash = "movie=" + movie.id
        })

        //crear imagen de la tarjeta con las propiedades
        const movieImage = document.createElement("img")
        movieImage.classList.add("movie-img")  
        movieImage.setAttribute("alt",movie.title)
        movieImage.setAttribute("src", 'https://image.tmdb.org/t/p/w300'+movie.poster_path)

        movieContainer.appendChild(movieImage)

        container.appendChild(movieContainer)
    });
}

function createCategory(categories, container) {
 container.innerHTML=""
 categories.forEach(category => {

    //crear contenedor de categoria
    const categoryContainer = document.createElement("div")
    categoryContainer.classList.add("category-container")

    //crear imagen de la tarjeta con las propiedades
    const movieH3 = document.createElement("h3")
    movieH3.classList.add("category-title")  
    movieH3.setAttribute("id", `id`+category.id)
    movieH3.addEventListener("click",()=>{
        location.hash=`#category=${category.id}-${category.name}`
    })
    movieH3.textContent= category.name

    categoryContainer.appendChild(movieH3)

    //console.log(categoryContainer)

    container.appendChild(categoryContainer)

});
}


async function getTrendingMoviesPreview() {
    try {
        const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")

        const {data} = await API(`3/trending/movie/day`)
        
        //const data = await res.json() - esto es sin el axios

       // console.log(data)
        const movies = await data.results

       // console.log(movies)

       //trendingMoviesPreviewList

       createMovie(movies, trendingMoviesPreviewList)

          
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getCategoriesMoviesPreview() {
    try {
        const contenrArticulCategory = document.querySelector("#categoriesPreview .categoriesPreview-list")

        const {data} = await API(`3/genre/movie/list?language=es` )
       // const data = await res.json()
        const categorys = await data.genres
        //console.log(categorys)
      
        createCategory(categorys, contenrArticulCategory)
       
   
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getMovieCategory(id) {
    try {
       // const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")

        const {data} = await API(`3/discover/movie`,{
            params:{
                with_genres: id
            }
        })
        
       //const data = await res.json() - esto es sin el axios
       // console.log(data)
        const movies = await data.results

        createMovie(movies,genericSection)

       // console.log(movies)

       
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getMovierBySearch(query) {
    try {
       // const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")

        const {data} = await API(`3/search/movie`,{
            params:{
                query: query
            }
        })
        
       //const data = await res.json() - esto es sin el axios
       // console.log(data)
        const movies = await data.results

        createMovie(movies,genericSection)

       // console.log(movies)

       
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getTrendingMovies() {
    try {
  
        const {data} = await API(`3/trending/movie/day`)
        
        //const data = await res.json() - esto es sin el axios

       // console.log(data)
        const movies = await data.results

       // console.log(movies)

       //trendingMoviesPreviewList

       createMovie(movies, genericSection)

          
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getMovieByID(id) {
    try {
        
        //con esto estoy renombrando mi objeto date en movie
        const {data: movie} = await API(`3/movie/${id}`)
        
        const imgURL = 'https://image.tmdb.org/t/p/w500'+ movie.poster_path

        headerSection.style.background= `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${imgURL})
        `
        movieDetailTitle.textContent = movie.title
        movieDetailDescription.textContent = movie.overview
        movieDetailScore.textContent = movie.vote_average

        createCategory(movie.genres, movieDetailCategoriesList)
        getRelatedMovie(id)
          
    } catch (error) {
        console.log(`Ups Ocurrio un error ${error}`)
    }
    
}

async function getRelatedMovie(id) {
    const {data} = await API(`3/movie/${id}/similar`)
    const moviesRelated = data.results

    createMovie(moviesRelated, relatedMoviesContainer)

}


