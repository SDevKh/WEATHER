const apiKey = "7528c943f8bef0614224c0a814ad4c26";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameElement = document.getElementById('city-name');
const tempElement = document.getElementById('temp');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();

    if (cityName) {
        fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid city name');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherData(data);
                errorMessage.textContent = '';
            })
            .catch(error => {
                errorMessage.textContent = error.message;
            });
    } else {
        errorMessage.textContent = 'Please enter a city name';
    }
});

function updateWeatherData(data) {
    const { name, main, wind } = data;
    const { temp, humidity } = main;
    const { speed } = wind;

    cityNameElement.textContent = `${name}`;
    tempElement.textContent = `${Math.round(temp)}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${speed} m/s`;
}