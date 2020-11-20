// 1. Versi jquery

// function searchMovie() {
    
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=ad63a523&s=' + $('#search-input').val(),
//         success: result => {
//             if (result.Response == 'True') {
//                 const movies = result.Search;
//                 let cards = '';
//                 movies.forEach(m => {
//                     cards += showCards(m);
//                 });
//                 $('.movie-list').html(cards);

//                 $('.modal-detail-button').on('click', function () {
//                     $('.modal-body').html('');
//                     $.ajax({
//                         url: 'http://www.omdbapi.com/?apikey=ad63a523&i=' + $(this).data('imdb'),
//                         success: m => {
//                             let movieDetail = showMovieDetail(m);
//                             $('.modal-body').html(movieDetail);
//                         },
//                         error: e => {
//                             console.log(e.responseText);
//                         }
                    
//                     });
//                 });
//             } else {
//                 $('.movie-list').html(`<div class="col">
//                <h2 class="text-danger text-center">${result.Error}</h2>
//                </div>`);
//             }
//             },
//             error: e => {
//                 console.log(e.responseText);
//             }
//     });
// }

// $('#search-button').on('click', function () {
//     searchMovie();
// });

// $('#search-input').on('keyup', function (e) {
//     if (e.keyCode === 13) {
//         searchMovie();
//     }
// });

// 2. Versi fetch

// const searchButton = document.querySelector('#search-button');
// searchButton.addEventListener('click', function () {
//     const searchInput = document.querySelector('#search-input');
//     fetch('http://www.omdbapi.com/?apikey=ad63a523&s=' + searchInput.value)
//         .then(response => response.json())
//         .then(response => {
//             if (response.Response == 'True') {
//                 const movies = response.Search;
//                 let cards = '';
//                 movies.forEach(m => {
//                     cards += showCards(m);
//                     const movieList = document.querySelector('.movie-list');
//                     movieList.innerHTML = cards;

//                     const mDetailMovie = document.querySelectorAll('.modal-detail-button');
//                     mDetailMovie.forEach(btn => {
//                         btn.addEventListener('click', function () {
//                             const mBody = document.querySelector('.modal-body');
//                             mBody.innerHTML = '';
//                             const imdbID = this.dataset.imdb;
//                             fetch('http://www.omdbapi.com/?apikey=ad63a523&i=' + imdbID)
//                                 .then(response => response.json())
//                                 .then(m => {
//                                     let movieDetail = showMovieDetail(m);
//                                     const modalBody = document.querySelector('.modal-body');
//                                     modalBody.innerHTML = movieDetail;
//                                 });
//                         });
//                     });
//                 });
//             } else{
//                 const mList = document.querySelector('.movie-list');
//                 mList.innerHTML = `<div class="col"><h2 class="text-danger text-center">${response.Error}</h2></div>`
//             }
//         });
// });

// 3. Versi Fetch rapi

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('#search-input');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('keyup', async function (e) {
    
    if (e.keyCode == 13) {
        const movies = await getMovies(searchInput.value);
        updateUI(movies);
    }
})

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const mBody = document.querySelector('.modal-body');
        mBody.innerHTML = '';
        const imdbID = e.target.dataset.imdb;
        const movieDetail = await getMovieDetail(imdbID);
        updateUIDetail(movieDetail);
    }
});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=ad63a523&s=' + keyword)
        .then(response => response.json())
        .then(response => {
            if (response.Response == 'False') {
                const mList = document.querySelector('.movie-list');
                mList.innerHTML = `<div class="col">
                    <h2 class="text-danger text-center">${response.Error}</h2>
                </div>`;
            }
            return response.Search;
        });
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards+=showCards(m));
    const movieList = document.querySelector('.movie-list');
    movieList.innerHTML = cards;
}

function getMovieDetail(imdbID) {
    return fetch('http://www.omdbapi.com/?apikey=ad63a523&i=' + imdbID)
        .then(response => response.json())
        .then(m => m);
}

function updateUIDetail(m) {
    let mDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = mDetail;
}

// const searchButton = document.querySelector('#search-button');
// searchButton.addEventListener('click', async function () {
//     try {
//         const searchInput = document.querySelector('#search-input');
//         const movies = await getMovies(searchInput.value);
//         updateUI(movies);
//     } catch (err) {
//         console.error(err);
//     }
// });

// const searchInput2 = document.querySelector('#search-input');
// searchInput2.addEventListener('keyup', async function (e) {
//     try {
//         if (e.keyCode === 13) {
//             const movies = await getMovies(searchInput2.value);
//             updateUI(movies);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });

// document.addEventListener('click', async function (e) {
//     try {
//         if (e.target.classList.contains('modal-detail-button')) {
//             const modalBody = document.querySelector('.modal-body');
//             modalBody.innerHTML = '';
//             const imdbID = e.target.dataset.imdb;
//             const movieDetail = await getMovieDetail(imdbID);
//             updateUIDetail(movieDetail);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// })

// function getMovies(keyword) {
//     return fetch('http://www.omdbapi.com/?apikey=ad63a523&s=' + keyword)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then(response => {
//             if (response.Response === "False") {
//                 const containerMovie = document.querySelector('.movie-list');
//                 const err = `<div class="col"><h1 class="text-center text-danger">${response.Error}</h1></div>`;
//                 containerMovie.innerHTML = err;
//                 throw new Error(response.Error);
//             }
//             return response.Search;
//         });
// }

// function updateUI(movies) {
//     let cards = '';
//     movies.forEach(m => cards += showCards(m));
//     const movieList = document.querySelector('.movie-list');
//     movieList.innerHTML = cards;
// }

// function getMovieDetail(imdbID) {
//     return fetch('http://www.omdbapi.com/?apikey=ad63a523&i=' + imdbID)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then(m => m);
// }

// function updateUIDetail(m) {
//     const movie = showMovieDetail(m);
//     const modalBody = document.querySelector('.modal-body');
//     modalBody.innerHTML = movie;
// }


function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" alt="" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title">
                            <h5>${m.Title}</h5>
                        </div>
                        <div class="card-subtitle mb-2 text-muted">
                            <h6>${m.Year}</h6>
                        </div>
                        <a href="#" class="btn btn-success modal-detail-button" data-toggle="modal" data-target="#movieID" data-imdb="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                            <div class="row">
                                <div class="col-md-5">
                                    <img src="${m.Poster}" alt="" class="img-fluid">
                                </div>
                                <div class="col-md-7">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>${m.Title}</h4></li>
                                        <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                                 z             <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                                        <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                                        <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                                        <li class="list-group-item"><strong>Ratings : </strong>${m.imdbRating}/10</li>
                                        <li class="list-group-item"><strong>Released : </strong>${m.Released}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>`;

}