import { validateDestination, validateTravelDate } from './validation.js';
import { fetchWeatherData } from './api.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');
const travelDateInput = document.querySelector('#travel-date-input');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityValue = destinationInput.value;
     const dateValue = travelDateInput.value;

    try {
        validateDestination(cityValue);
         validateTravelDate(dateValue);
      console.log(`Надсилаємо запит для ${cityValue} на дату ${dateValue}...`);
        const weatherData = await fetchWeatherData(cityValue);

        alert(`План успішний! Погода в ${weatherData.destination}: ${weatherData.temperature}°C, ${weatherData.condition}`);

    } catch (error) {
        alert(error.message);
    }
});
