const heading = document.querySelector('[heading]');

const yourWeatherBtn = document.querySelector('[data-yourWeather]');
const searchWeatherBtn = document.querySelector('[data-searchWeather]');

const grantAccessContainer = document.querySelector('.grant-location-container');
const grantAccessButton = document.querySelector('[data-grantAccess]');
const weatherContainer = document.querySelector('.user-info-container');

let cityName = document.querySelector('[data-cityName]');
let countryIcon = document.querySelector('[data-countryIcon]');

let weatherDescription = document.querySelector('[data-weatherDesc]');
let weatherIcon = document.querySelector('[data-weatherIcon]');

let temperatue = document.querySelector('[data-temp]');

let windSpeed = document.querySelector('[data-windSpeed]');
let humidity = document.querySelector('[data-humidity]');
let cloudiness = document.querySelector('[data-cloudiness]');

const searchForm = document.querySelector('[data-searchForm]');
const getCityInput = document.querySelector('[data-searchInput]');
const searchIcon = document.querySelector('[data-searchIcon]');
const errorMessage = document.querySelector('[data-errorMessage]');

let loader = document.querySelector('.loading-container');

const API_KEY = 'f079449b93f0905022c4467d99f5a252';

let searchedCity = false;
let locationAccess = false;

let prevClass = loader;
currentClass(prevClass);

function currentClass(currentClass) {
    if (prevClass != currentClass) {
        currentClass.classList.remove('non-active');
        prevClass.classList.add('non-active');
        prevClass = currentClass;
    } else {
        currentClass.classList.remove('non-active');
        prevClass = currentClass;
    }
}

function handleLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorFunction);
    }

    function checkauthorizedGeoLocation() {
        if (typeof localStorage['authorizedGeoLocation'] == "undefined" || localStorage['authorizedGeoLocation'] == "0")
            navigator.geolocation;
        else {
            currentClass(grantAccessContainer);
        } 
    }

    checkauthorizedGeoLocation();
};

handleLocation();

function errorFunction() {
    localStorage['authorizedGeoLocation'] = 0;
    currentClass(grantAccessContainer);
}

grantAccessButton.addEventListener('click', () => {
    handleLocation();
})

function showPosition(position) {
    currentClass(weatherContainer);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    showWeatherByCoords(lat, lon);
}

async function showWeatherByCoords(lat, lon) {
    currentClass(loader);
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        renderWeatherInfo(data);
        locationAccess = true;
        currentClass(weatherContainer);
    } catch (error) {
        console.error(error);
    }
}

function renderWeatherInfo(data) {
    cityName.innerText = data.name;
    
    countryIcon.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;

    weatherDescription.innerText = data.weather[0].main;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperatue.innerText = `${data.main.temp} ${String.fromCharCode(176)}C`;

    windSpeed.innerText = `${data.wind.speed} m/s`;

    humidity.innerText = `${data.main.humidity}%`;

    cloudiness.innerText = `${data.clouds.all}%`;
}

searchIcon.addEventListener('click', () => {
    showWeatherByCity(getCityInput.value);
    getCityInput.value = '';
    currentClass(weatherContainer);
});

getCityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        showWeatherByCity(getCityInput.value);
        getCityInput.value = '';
    }
});

async function showWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();  
        console.log(data);
        if (data.cod == 404) {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            currentClass(loader);
            searchedCity = true;
            renderWeatherInfo(data);
            currentClass(weatherContainer);
            currentClass(weatherContainer);
        }
    } catch (error) {
        console.error(error);
    }
}

yourWeatherBtn.addEventListener('click', () => {
    if (searchedCity || locationAccess) {
        currentClass(weatherContainer);
    }
});

heading.addEventListener('click', () => {
    if (searchedCity || locationAccess) {
        currentClass(weatherContainer);
    }
});

searchWeatherBtn.addEventListener('click', () => {
    currentClass(searchForm);
});






