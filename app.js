const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&#39"
const imgPath = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const moviesSection = document.getElementById('moviesSection');
const searchWord = document.getElementById('search');
const form = document.getElementById('form').addEventListener('submit', formData);


// function that requests the movie data fetching the API 
async function getElem (url) {
    try {
        const result = await fetch(url);
        const movie = await result.json();
        const movieData = movie.results;
        //console.log(movieData);
        movieData.forEach(element => {
            const div = document.createElement('div')
            const rating = document.createElement('h4');
            const date = document.createElement('h4');
            date.innerHTML = `Release date: ${element.release_date}`
            rating.innerHTML = `RATING: ${element.vote_average}/${element.vote_count} (vote count)`;
            const image = document.createElement("img");
            image.src = imgPath  + element.poster_path;
            //image.src = `${imgPath}${element.poster_path}`;
            div.appendChild(image);
            div.appendChild(rating);
            div.appendChild(date);
            moviesSection.appendChild(div);

        }); 
    } catch (err) {
        console.log(err);
    }
}
getElem(apiUrl); // put the data in the HTML(section) by creating div with image and title.

function formData (e)  {
    e.preventDefault();
    moviesSection.innerHTML = 'PLEASE enter e keyword for searching a movie!'; // if search input is empty, movies section disappear.
    const search = searchWord.value;
    if(search) {
        getElem(SEARCHAPI + search);
        search.value = "";
    }
};