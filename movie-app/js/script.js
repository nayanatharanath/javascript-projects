const global = { currentPage: window.location.pathname };

// Polpular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  // console.log(results);
  results.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("card");
    movieDiv.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              alt="${movie.title}"
              class="card-img-top"
            />`
                : `
            <img
              src="images/no-image.jpg"
              alt="${movie.title}"
              class="card-img-top"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
    `;

    document.querySelector("#popular-movies").appendChild(movieDiv);
  });
}

// display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  // console.log(movieId);
  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background
  displayBackgroudImage("movie", movie.background_path);

  const movieDiv = document.createElement("div");

  movieDiv.innerHTML = `
    <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="${movie.title}"
      class="card-img-top"
    />`
        : `
    <img
      src="images/no-image.jpg"
      alt="${movie.title}"
      class="card-img-top"
    />
    `
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-start text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date} </p>
      <p>
        ${movie.overview}
      </p>
      <h5>Geners</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )} </li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.rumtime
            } minutes </li>
            <li><span class="text-secondary">Status:</span> ${
              movie.status
            } </li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((company) => `<span> ${company.name} </span>`)
            .join(", ")}
          </div>
        </div>
    `;

  document.querySelector("#movie-details").appendChild(movieDiv);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  // console.log(results);
  results.forEach((tvshow) => {
    const tvshowDiv = document.createElement("div");
    tvshowDiv.classList.add("card");
    tvshowDiv.innerHTML = `
          <a href="tv-details.html?id=${tvshow.id}">
            ${
              tvshow.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${tvshow.poster_path}"
              alt="${tvshow.name}"
              class="card-img-top"
            />`
                : `
            <img
              src="images/no-image.jpg"
              alt="${tvshow.name}"
              class="card-img-top"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tvshow.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired Date: ${
                tvshow.first_air_date
              }</small>
            </p>
          </div>
    `;

    document.querySelector("#popular-shows").appendChild(tvshowDiv);
  });
}

// display tv show details
async function displayTVShowDetails() {
  const showId = window.location.search.split("=")[1];
  console.log(showId);
  const show = await fetchAPIData(`tv/${showId}`);
  displayBackgroudImage("tv", show.background_path);

  const showDiv = document.createElement("div");
  showDiv.innerHTML = `
  <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      alt="${show.name}"
      class="card-img-top"
    />`
        : `
    <img
      src="images/no-image.jpg"
      alt="${show.name}"
      class="card-img-top"
    />
    `
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-start text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date} </p>
      <p>
        ${show.overview}
      </p>
      <h5>Geners</h5>
      <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            } </li>
            <li><span class="text-secondary">Last Episode To Air:</span> ${
              show.last_episode_to_air.name
            } </li>
            <li><span class="text-secondary">Status:</span> ${show.status} </li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies
            .map((company) => `<span> ${company.name} </span>`)
            .join(", ")}
          </div>
        </div>
  `;

  document.querySelector("#show-details").appendChild(showDiv);
}

// To show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// hide spinner
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "e2cc3b636d73a93702c6d2111f3ad09f";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

// Highlight Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// display background on details page
function displayBackgroudImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.5";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Display Slider Movies
// async function displaySlider() {
//   const { results } = await fetchAPIData(`movie/now_playing`);

//   results.forEach((result) => {
//     const div = document.createElement("div");
//     div.classList.add("swiper-slide");
//     div.innerHTML = `
//     <a href="movie-details.html?id=${movie.id}">
//          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
//       </a>
//       <h4 class="swiper-rating">
//         <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
//       </h4>
//     `;

//     document.querySelector(".swiper-wrapper").appendChild(div);

//     initSwipper();
//   });
// }

function initSwipper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disabledOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/movie-app/":
    case "/movie-app/index.html":
      // console.log("Home");
      // displaySlider();
      displayPopularMovies();
      break;

    case "/movie-app/shows.html":
      // console.log("Shows");
      displayPopularShows();
      break;

    case "/movie-app/movie-details.html":
      // console.log("Movie Details");
      displayMovieDetails();
      break;

    case "/movie-app/tv-details.html":
      // console.log("TV Details");
      displayTVShowDetails();
      break;

    case "/movie-app/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
