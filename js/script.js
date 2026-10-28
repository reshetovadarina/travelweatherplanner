import { validateDestination, validateTravelDate } from './validation.js';
import { fetchWeatherData } from './api.js';
import {
    renderWeatherCard,
    showErrorMessage,
    clearErrorMessage,
    renderSavedTrips,
    hideWishlistForm,
    showLoadingIndicator,
    hideLoadingIndicator,
    showWishlistErrorMessage,
    clearWishlistErrorMessage
} from './renderer.js';
import { saveTripToStorage, getSavedTrips, deleteTripFromStorage } from './storage.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');
const wishlistForm = document.querySelector('#wishlist-form');
const wishlistDateInput = document.querySelector('#wishlist-date-input');
const wishlistNoteInput = document.querySelector('#wishlist-note-input');
const savedTripsList = document.querySelector('#saved-trips-list');

let activeWeatherData = null;
const initialTrips = getSavedTrips();
renderSavedTrips(initialTrips);

function formatDate(date) {
    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrorMessage();

    const cityValue = destinationInput.value.trim();

    try {
        validateDestination(cityValue);

        showLoadingIndicator();
        const weatherData = await fetchWeatherData(cityValue);

        activeWeatherData = weatherData;
        renderWeatherCard(weatherData);
    } catch (error) {
        showErrorMessage(error.message);
        activeWeatherData = null;
    } finally {
        hideLoadingIndicator();
    }
});

wishlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearWishlistErrorMessage();

    const dateValue = wishlistDateInput.value;
    const noteValue = wishlistNoteInput.value.trim();

    try {
        validateTravelDate(dateValue);
        const formattedTravelDate = formatDate(new Date(dateValue));
        const addedDate = formatDate(new Date());

        const wishlistPlan = {
            id: Date.now().toString(),
            travelDate: formattedTravelDate,
            addedAt: addedDate,
            note: noteValue,
            ...activeWeatherData
        };

        const updatedTrips = saveTripToStorage(wishlistPlan);
        renderSavedTrips(updatedTrips);

        hideWishlistForm();
        searchForm.reset();
        activeWeatherData = null;
    } catch (error) {
        showWishlistErrorMessage(error.message);
    }
});

savedTripsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const tripId = event.target.getAttribute('data-id');
        const updatedTrips = deleteTripFromStorage(tripId);
        renderSavedTrips(updatedTrips);
    }
});
