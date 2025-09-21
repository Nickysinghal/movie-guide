const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

const searchBtn = document.querySelector(".searchBtn");


//Adding event listener to search form
searchForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    const movieName = inputBox.value.trim();
    if(movieName!==''){
        getMovieInfo(movieName);

    }
})

searchBtn.addEventListener("onclick",()=>{

    e.preventDefault();

    const movieName = inputBox.value.trim();
    if(movieName!==''){
        getMovieInfo(movieName);

    }})


//function to fetch movie details using OMDB API
const getMovieInfo = async (movie)=>{
    const myAPIkey = "f9665fff";
    const url = `http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    showMovieData(data);
}

//function to show movie data on screen
const showMovieData = (data)=>{
    //clear previous screen
    movieContainer.innerHTML ="";

    //use destructiong assignmnet to extract properties from data object
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    //create an element to show movie info
    const movieElement = document.createElement('div');
    movieElement.classList.add("movie-info");

    movieElement.innerHTML=`
                            <h1> ${Title}</h1>
                            <p>&#11088; ${imdbRating}</p>
                            `;

    //element to show genre
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.classList.add('genre');

        p.innerHTML = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    //adding other details to show
    movieElement.innerHTML += `<p><strong> Released Date: </strong> ${Released}</p>
                                <p><strong>Duration: </strong> ${Runtime}</p>
                                <p><strong>Cast: </strong> ${Actors}</p>
                                <p><strong>Plot: </strong> ${Plot}</p>
                             `;
    
    
    // creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}

