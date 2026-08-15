// OpenWeatherMap API Key - Using free tier
const API_KEY = 'a6d3d6b3e6f7b9c1d3e5f7a9b1c3d5e7';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

let currentCityData = null;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];

// Weather icon mapping
const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌫️',
    'Dust': '🌪️',
    'Fog': '🌫️',
    'Sand': '🌪️',
    'Ash': '💨',
    'Squall': '🌪️',
    'Tornado': '🌪️'
};

// Initialize favorites on page load
document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
    // Load default city
    searchWeatherByCity('London');
});

// Search weather by city name
function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    searchWeatherByCity(city);
}

// Search weather by city name
function searchWeatherByCity(city) {
    showLoading(true);
    hideError();
    
    const url = `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            currentCityData = data;
            displayCurrentWeather(data);
            getForecast(data.coord.lat, data.coord.lon);
            showLoading(false);
        })
        .catch(error => {
            showError('Error: ' + error.message);
            showLoading(false);
        });
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                searchWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                showError('Unable to get your location. ' + error.message);
                showLoading(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Search weather by coordinates
function searchWeatherByCoordinates(lat, lon) {
    const url = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentCityData = data;
            displayCurrentWeather(data);
            getForecast(lat, lon);
            showLoading(false);
        })
        .catch(error => {
            showError('Error fetching weather data');
            showLoading(false);
        });
}

// Display current weather
function displayCurrentWeather(data) {
    const mainWeatherSection = document.getElementById('mainWeatherSection');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const feelsLike = document.getElementById('feelsLike');
    const pressure = document.getElementById('pressure');
    const visibility = document.getElementById('visibility');
    const cloudiness = document.getElementById('cloudiness');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const weatherIcon = document.getElementById('weatherIcon');
    const currentDate = document.getElementById('currentDate');
    
    // Update data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp) + '°C';
    weatherDescription.textContent = data.weather[0].main + ' - ' + data.weather[0].description;
    humidity.textContent = data.main.humidity + '%';
    windSpeed.textContent = (data.wind.speed).toFixed(2) + ' m/s';
    feelsLike.textContent = Math.round(data.main.feels_like) + '°C';
    pressure.textContent = data.main.pressure + ' hPa';
    visibility.textContent = (data.visibility / 1000).toFixed(1) + ' km';
    cloudiness.textContent = data.clouds.all + '%';
    
    // Convert timestamps to readable time
    sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Set weather icon
    weatherIcon.textContent = weatherIcons[data.weather[0].main] || '🌤️';
    
    // Set current date
    currentDate.textContent = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    mainWeatherSection.style.display = 'block';
}

// Get 5-day forecast
function getForecast(lat, lon) {
    const url = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
}

// Display forecast
function displayForecast(forecastList) {
    const forecastSection = document.getElementById('forecastSection');
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // Get forecast for every 8th item (24 hours) for 5 days
    const dailyForecasts = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        if (!dailyForecasts[date] || item.dt_txt.includes('12:00:00')) {
            dailyForecasts[date] = item;
        }
    });
    
    // Create forecast cards
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(forecast.dt * 1000);
        const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const icon = weatherIcons[forecast.weather[0].main] || '🌤️';
        const maxTemp = Math.round(forecast.main.temp_max);
        const minTemp = Math.round(forecast.main.temp_min);
        
        card.innerHTML = `
            <div class="forecast-date">${dateStr}</div>
            <div class="forecast-icon">${icon}</div>
            <div class="forecast-temp">${maxTemp}°C</div>
            <div class="forecast-temp-range">Min: ${minTemp}°C</div>
            <div class="forecast-description">${forecast.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(card);
    });
    
    forecastSection.style.display = 'block';
}

// Add current city to favorites
function addCurrentToFavorites() {
    if (!currentCityData) {
        showError('Please search for a city first');
        return;
    }
    
    const city = {
        name: currentCityData.name,
        country: currentCityData.sys.country,
        coord: {
            lat: currentCityData.coord.lat,
            lon: currentCityData.coord.lon
        }
    };
    
    // Check if already in favorites
    const exists = favorites.some(fav => fav.name === city.name && fav.country === city.country);
    if (exists) {
        showError('This city is already in your favorites');
        return;
    }
    
    if (favorites.length >= 10) {
        showError('Maximum 10 favorite cities allowed');
        return;
    }
    
    favorites.push(city);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    displayFavorites();
}

// Remove from favorites
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    displayFavorites();
}

// Display favorites
function displayFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    
    // Clear and keep only the add button
    const addBtn = favoritesContainer.querySelector('.add-favorite-btn');
    favoritesContainer.innerHTML = '';
    
    if (addBtn) {
        favoritesContainer.appendChild(addBtn);
    }
    
    favorites.forEach((city, index) => {
        const button = document.createElement('button');
        button.className = 'favorite-btn';
        button.innerHTML = `
            <div>${city.name}, ${city.country}</div>
            <button class="delete-favorite" onclick="removeFavorite(${index}); event.stopPropagation();">×</button>
        `;
        button.onclick = () => searchWeatherByCoordinates(city.coord.lat, city.coord.lon);
        favoritesContainer.appendChild(button);
    });
}

// UI Helper functions
function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'flex' : 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
});