import { validateDestination, validateTravelDate } from './validation.js';
import { fetchWeatherData } from './api.js';
import { renderWeatherCard, showErrorMessage, clearErrorMessage } from './renderer.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');
const travelDateInput = document.querySelector('#travel-date-input');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrorMessage();

    const cityValue = destinationInput.value.trim();
    const dateValue = travelDateInput.value;

    try {

        validateDestination(cityValue);
        validateTravelDate(dateValue);

        const weatherData = await fetchWeatherData(cityValue);

        renderWeatherCard(weatherData, dateValue);

        searchForm.reset();

    } catch (error) {
        showErrorMessage(error.message);
    }
});
