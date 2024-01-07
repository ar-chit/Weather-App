let city = 'Bengaluru';
const ApiKey = 'f079449b93f0905022c4467d99f5a252';
let jsonData;


function renderWeatherInfo(data) {
    const newPara = document.createElement('p');
    newPara.textContent = `${data.main.temp.toFixed(2)}`;

    document.body.appendChild(newPara);
}

// (async function showWeather() {

//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
//         const data = await response.json();

//         console.log(data);
        
//         // renderWeatherInfo(data);
//     } catch (error) {
//         console.error(error);
//     }

// })();

(async function showWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=30.8751282&lon=75.8053175&appid=${ApiKey}`);
        const data = await response.json();
        console.log(data);
        // renderWeatherInfo(data);
    } catch (error) {
        console.error(error);
    }
})();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log('Location not found');
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    console.log(lat);
    console.log(lon); 
}

getLocation();


