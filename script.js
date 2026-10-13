import { validateDestination } from './validation.js';
import { fetchWeatherData } from './api.js';
import { renderWeatherCard, showErrorMessage, clearErrorMessage } from './renderer.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrorMessage();

    const cityValue = destinationInput.value.trim();

    try {

        validateDestination(cityValue);

        const weatherData = await fetchWeatherData(cityValue);

        renderWeatherCard(weatherData);

        searchForm.reset();

    } catch (error) {
        showErrorMessage(error.message);
    }
});
