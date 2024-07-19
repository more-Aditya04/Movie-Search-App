const searchform = document.querySelector('form');
const movieContainer = document.querySelector('.movie-contain');
const inputBox = document.querySelector('.inputBox');

const getMovieinformation =  async (movie) => {
    try {
        
    
    const keyapi = "3eafe4af";
    const url = `https://www.omdbapi.com/?apikey=${keyapi}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("Unable to fetch movie");
    }
    const data = await response.json();
    
    showDataMovie(data);
    } 
    catch (error) {
        showErrorMsg("No Movie Found..");
    }
}
//function to fetch moviw
const showDataMovie = (data) => {
    movieContainer.innerHTML = ""; // remove previous movie
    movieContainer.classList.remove('nobg');

    const{Title, imdbRating, Genre, Released,Runtime, Actors, Plot, Poster} = data;

    const movieelement = document.createElement('div');
    movieelement.classList.add('movie-info');
    movieelement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

     const movieGenreElement = document.createElement('div');
     movieGenreElement.classList.add('movie-genre');

     Genre.split(",").forEach(element => {
        const p = document.createElement('p')
        p.innerText = element;
        movieGenreElement.appendChild(p);
     });

     movieelement.appendChild(movieGenreElement);
     movieelement.innerHTML += `<p><strong>Released Year: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;

    //create poster 
    const movieposter = document.createElement('div');
    movieposter.classList.add('movie-poster');
    movieposter.innerHTML = `<img src="${Poster}"/>`;
    movieContainer.appendChild(movieposter);

    movieContainer.appendChild(movieelement);
 }

 //function to display error msg
 const showErrorMsg = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`
    movieContainer.classList.add('nobg');
 }

 //function to handle submission form
 const handleForm = (ele) => {
    ele.preventDefault();
    
    const namemovie = inputBox.value.trim();
    if(namemovie !== '') {
        showErrorMsg("Fetching Movie ...")
        getMovieinformation(namemovie);
    }
    else{
        showErrorMsg("Enter movie name u want?")
    }
 }
//Adding event listner to search form
searchform.addEventListener('submit', handleForm);