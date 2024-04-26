// Create a config.js file and store your keys here
const playBtn = document.getElementById('playBtn');
const headers = {
  method: 'GET',
  cache: 'no-cache',
  headers: {
    accept: 'application/json',
    Authorization: BEARER_TOKEN
  }
}

const getGenres = async () => {
  const genreRequestEndpoint = TMDB_BASE_URL+'/genre/movie/list?language=en'
  const urlToFetch = genreRequestEndpoint;

  try{
    const response = await fetch(urlToFetch, headers
      );
      if(response.ok){
        const jsonResponse = await response.json();
        const genres = jsonResponse['genres'];
        return genres;
      }
  } catch(error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie?'
  const requestParams = `with_genres=${selectedGenre}`;
  const urlToFetch = TMDB_BASE_URL+discoverMovieEndpoint+requestParams;

  try{
    const response = await fetch(urlToFetch, headers);
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch(error) {
    console.log(error);
  }
}

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint= `/movie/${movieId}`
  const urlToFetch = TMDB_BASE_URL+movieEndpoint;

  try {
    const response = await fetch (urlToFetch, headers);
    if (response.ok){
      const jsonResponse = await response.json()
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (error){
    console.log(error);
  }
  
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  // show loading sign until new response is fetched
  const loaderDiv = document.getElementById('loaderDiv');
  loaderDiv.style.display = 'grid';

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info  = await getMovieInfo(randomMovie);
  // remove loading sign after fetching response
  loaderDiv.style.display = 'none';

  // show new random movie
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;