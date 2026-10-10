import { validateDestination } from './validation.js';
import { fetchWeatherData } from './api.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityValue = destinationInput.value;

    try {
        validateDestination(cityValue);
        console.log(`Надсилаємо запит для міста: ${cityValue}...`);
        const weatherData = await fetchWeatherData(cityValue);
        console.log("Дані про погоду успішно отримано від API:", weatherData);
        alert(`Погода в ${weatherData.destination}: ${weatherData.temperature}°C, ${weatherData.condition}`);

    } catch (error) {
        alert(error.message);
    }
});
