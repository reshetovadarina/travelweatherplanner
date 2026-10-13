import { validateDestination, validateTravelDate } from './validation.js';
import { fetchWeatherData } from './api.js';
import { renderWeatherCard, showErrorMessage, clearErrorMessage } from './renderer.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');
const wishlistForm = document.querySelector('#wishlist-form');
const wishlistDateInput = document.querySelector('#wishlist-date-input');
let activeWeatherData = null;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrorMessage();

    const cityValue = destinationInput.value.trim();

    try {
        validateDestination(cityValue);

        const weatherData = await fetchWeatherData(cityValue);

        activeWeatherData = weatherData;
        renderWeatherCard(weatherData);
        searchForm.reset();

    } catch (error) {
        showErrorMessage(error.message);
        activeWeatherData = null;
    }
});

wishlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrorMessage();

    const dateValue = wishlistDateInput.value;

    try {

        validateTravelDate(dateValue);

        const wishlistPlan = {
            id: Date.now().toString(),
            date: dateValue,
            ...activeWeatherData
        };

        alert(`Успішно додано у wishlist!\n\nМісто: ${wishlistPlan.destination}\nДата поїздки: ${wishlistPlan.date}\nПоточна температура: ${wishlistPlan.temperature}°C`);

        wishlistForm.reset();
        wishlistForm.classList.add('hidden');

    } catch (error) {
        showErrorMessage(error.message);
    }
});
