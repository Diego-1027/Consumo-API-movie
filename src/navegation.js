searchFormBtn.addEventListener("click", ()=>{location.hash="#search="+searchFormInput.value})
trendingBtn.addEventListener("click", ()=>{location.hash="#trends"})
arrowBtn.addEventListener("click", ()=>{history.back()})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashChange', navigator, false)

function navigator() {
    console.log({location})

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    }else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    }else if (location.hash.startsWith('#category=')) {
        categoryPage()
    }else{
        homePage()
    }


   document.body.scrollTop= 0
}

function homePage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')


    getTrendingMoviesPreview()
    getCategoriesMoviesPreview()

    console.log("home")

}

function categoryPage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryLocation]= location.hash.split("=")
    const [categoryID, categoryName] = categoryLocation.split("-")
     
    headerCategoryTitle.textContent = decodeURIComponent(categoryName)
    getMovieCategory(categoryID)
    
}

function movieDetailsPage() {

    headerSection.classList.add('header-container--long')
    headerSection.style.background= ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieID]= location.hash.split("=")
    getMovieByID(movieID);

    console.log("detail") 
}

function searchPage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    console.log("search")

    const [_, query]= location.hash.split("=")

    getMovierBySearch(query)
   
}

function trendsPage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    
    headerCategoryTitle.textContent = "Tendencias"
    getTrendingMovies()
}