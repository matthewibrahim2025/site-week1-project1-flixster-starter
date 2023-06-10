// Global Constants
const apiKey = "0cfdf801dc7ca973d72e3d4510dc8eb3"
let pageCount = 1
const imgCont =  document.querySelector("#photo-dis")
const searchForm =  document.querySelector("#search-form")
const input = document.querySelector("#search-input")
const submitButt = document.querySelector("#search-button")


// this is the work that actually puts the images on the page
function displaySrchResults(results) {

  console.log(results.results)
  
  const imgCont = document.querySelector("#img-cont-srch")

  // iterate for the length of the results
  for (let i = 0; i < results.results.length; i++) {
    const movieInfo = results.results[i]
    const stars = results.results[i].vote_average

    const cardDiv = document.createElement("div");

    let pic = movieInfo.poster_path;
    let picUrl = "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    if (pic != null) { 
      picUrl = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
    }

    cardDiv.innerHTML = `
      <img id="movie-poster" src=${picUrl}>
      </img>
      <p id="movie-title">
      <p id="movie-votes">⭐ ${stars} </p>
      ${movieInfo.title}</p>  
      `
    imgCont.appendChild(cardDiv);
  }
}



// this is the work that actually puts the images on the page
function displayCurrMovies() {

  const imgCont = document.querySelector("#img-cont-srch")
  imgCont.innerHTML = ""


  const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" + "&api_key=" + `${apiKey}`

  async function fn() {
    const response = await fetch(url);
    const data = await response.json();
    

    // iterate for the length of the results
    for (let i = 0; i < data.results.length; i++) {
      const movieInfo = data.results[i]
      const cardDiv = document.createElement("div");
      const stars = data.results[i].vote_average
      let pic = movieInfo.poster_path;
      let picUrl = "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
      if (pic != null) { 
        picUrl = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
      }
      cardDiv.innerHTML = `
        <img id="movie-poster" src=${picUrl}>
        </img>
        <p id="movie-title">
        <p id="movie-votes">⭐ ${stars} </p>
        ${movieInfo.title}
        </p>    `

      imgCont.appendChild(cardDiv);
    }
  }

  fn();
}


// get results from API
async function getMovieApiResults(searchTerm) {

  
  const url = "https://api.themoviedb.org/3/search/movie?" + "query=" + `${searchTerm}` + "&api_key=" + `${apiKey}` + "&page=" + pageCount.toString()
  async function fn() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  displaySrchResults(await fn());
}


/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  event.preventDefault()
  
  const imgCont1 = document.querySelector("#img-cont-curr")
  imgCont1.innerHTML = ""
  const imgCont2 = document.querySelector("#img-cont-srch")
  imgCont2.innerHTML = ""
  getMovieApiResults(input.value)
}


searchForm.addEventListener("submit", handleFormSubmit)



/**
 * Handle fetching the next set of results from the Movie API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */


let loadmore = document.querySelector("#load-more-movies-btn");
let closeBtn = document.querySelector("#close-search-btn");




async function handleShowMore() {
  pageCount +=1
  getMovieApiResults(input.value)
  // console.log(input.value)

}



window.onload = function () {
  // YOUR CODE HERE

  displayCurrMovies();
  loadmore.addEventListener("click", function() {
    handleShowMore();
  });

  closeBtn.addEventListener("click", function() {
    displayCurrMovies();
  });
  

}




